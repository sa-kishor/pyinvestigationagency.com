import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const testimonialsFile = path.join(dataDir, 'testimonials.json');

function readTestimonials(): any[] {
  try {
    if (existsSync(testimonialsFile)) {
      const data = readFileSync(testimonialsFile, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.log('No testimonials file found');
  }
  return [];
}

function writeTestimonials(testimonials: any[]) {
  writeFileSync(testimonialsFile, JSON.stringify(testimonials, null, 2));
}

// UPDATE review status or DELETE review
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const testimonials = readTestimonials();

    const index = testimonials.findIndex((t) => String(t.id) === String(id));
    if (index === -1) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    testimonials[index].status = body.status;
    writeTestimonials(testimonials);

    return NextResponse.json({
      success: true,
      message: `Review ${body.status.toLowerCase()}`,
      data: testimonials[index],
    });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

// DELETE review
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const testimonials = readTestimonials();

    const filtered = testimonials.filter((t) => String(t.id) !== String(id));

    if (filtered.length === testimonials.length) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    writeTestimonials(filtered);

    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
