import { NextResponse } from 'next/server';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const testimonialsFile = path.join(dataDir, 'testimonials.json');

const defaultTestimonials = [
  {
    id: 1,
    quote: 'Parthiban sir is very kind and professional. Trustworthy service, quick response, and clear guidance. Highly recommended!',
    name: 'Divyadharshini',
    date: '12 Jan 2025',
    createdAt: '2025-01-12T10:00:00Z',
  },
  {
    id: 2,
    quote: 'This agency truly exceeded my expectations. Their investigators are highly experienced, professional, and extremely committed to delivering accurate information.',
    name: 'Gayathri.V',
    date: '05 Dec 2025',
    createdAt: '2025-12-05T10:00:00Z',
  },
  {
    id: 3,
    quote: 'Very good work done. Highly recommended. I used them for gathering evidence against my cheating spouse.',
    name: 'Sudha Sudha',
    date: '26 Apr 2025',
    createdAt: '2025-04-26T10:00:00Z',
  },
];

// Ensure data directory exists
function ensureDataDir() {
  if (!existsSync(dataDir)) {
    const fs = require('fs');
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read testimonials from file
function readTestimonials(): any[] {
  ensureDataDir();
  try {
    if (existsSync(testimonialsFile)) {
      const data = readFileSync(testimonialsFile, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.log('Creating new testimonials file');
  }
  return defaultTestimonials;
}

// Write testimonials to file
function writeTestimonials(testimonials: any[]) {
  ensureDataDir();
  writeFileSync(testimonialsFile, JSON.stringify(testimonials, null, 2));
}

// Send email via Resend
async function sendEmail(to: string, subject: string, html: string) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.log('⚠️  RESEND_API_KEY not configured - email not sent');
      return false;
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Py Investigation Agency <noreply@pyinvestigation.com>',
        to: to,
        subject: subject,
        html: html,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

export async function GET() {
  const testimonials = readTestimonials();
  return NextResponse.json({
    success: true,
    data: testimonials,
    message: 'Testimonials retrieved successfully',
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const testimonials = readTestimonials();

  const newTestimonial = {
    id: testimonials.length + 1,
    quote: body.quote,
    name: body.name,
    date: body.date || new Date().toLocaleDateString(),
    createdAt: new Date().toISOString(),
  };

  testimonials.push(newTestimonial);
  writeTestimonials(testimonials);

  // Send admin notification email
  const adminEmailHtml = `
    <h2>New Testimonial/Review Received</h2>
    <p><strong>From:</strong> ${body.name}</p>
    <p><strong>Date:</strong> ${newTestimonial.date}</p>
    <p><strong>Review:</strong></p>
    <p style="background:#f0f0f0; padding:10px; border-left: 4px solid #d4af37;">
      "${body.quote}"
    </p>
    <p>Review ID: ${newTestimonial.id}</p>
    <p><em>This review has been automatically added to your testimonials section.</em></p>
  `;

  await sendEmail(
    'pyinvestigationagency@gmail.com',
    'New Testimonial Received',
    adminEmailHtml
  );

  return NextResponse.json(
    {
      success: true,
      data: newTestimonial,
      message: 'Testimonial added successfully and admin notified',
    },
    { status: 201 }
  );
}
