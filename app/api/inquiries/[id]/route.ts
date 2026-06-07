import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const inquiriesFile = path.join(dataDir, 'inquiries.json');

function readInquiries(): any[] {
  try {
    if (existsSync(inquiriesFile)) {
      const data = readFileSync(inquiriesFile, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.log('No inquiries file found');
  }
  return [];
}

function writeInquiries(inquiries: any[]) {
  writeFileSync(inquiriesFile, JSON.stringify(inquiries, null, 2));
}

// DELETE inquiry
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const inquiries = readInquiries();

    const filtered = inquiries.filter((i) => String(i.id) !== String(id));

    if (filtered.length === inquiries.length) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    writeInquiries(filtered);

    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
