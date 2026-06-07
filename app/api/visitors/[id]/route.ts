import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const visitorsFile = path.join(dataDir, 'visitors.json');

function readVisitors(): any[] {
  try {
    if (existsSync(visitorsFile)) {
      const data = readFileSync(visitorsFile, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.log('No visitors file found');
  }
  return [];
}

function writeVisitors(visitors: any[]) {
  writeFileSync(visitorsFile, JSON.stringify(visitors, null, 2));
}

// DELETE visitor
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const visitors = readVisitors();

    const filtered = visitors.filter((v) => String(v.id) !== String(id));

    if (filtered.length === visitors.length) {
      return NextResponse.json({ error: 'Visitor not found' }, { status: 404 });
    }

    writeVisitors(filtered);

    return NextResponse.json({
      success: true,
      message: 'Visitor deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting visitor:', error);
    return NextResponse.json({ error: 'Failed to delete visitor' }, { status: 500 });
  }
}
