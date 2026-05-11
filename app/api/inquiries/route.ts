import { NextResponse } from 'next/server';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const inquiriesFile = path.join(dataDir, 'inquiries.json');

// Ensure data directory exists
function ensureDataDir() {
  if (!existsSync(dataDir)) {
    const fs = require('fs');
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read inquiries from file
function readInquiries(): any[] {
  ensureDataDir();
  try {
    if (existsSync(inquiriesFile)) {
      const data = readFileSync(inquiriesFile, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.log('No inquiries file found, creating new one');
  }
  return [];
}

// Write inquiries to file
function writeInquiries(inquiries: any[]) {
  ensureDataDir();
  writeFileSync(inquiriesFile, JSON.stringify(inquiries, null, 2));
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
  const inquiries = readInquiries();
  return NextResponse.json({
    success: true,
    data: inquiries,
    message: 'Inquiries retrieved successfully',
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const inquiries = readInquiries();

  const newInquiry = {
    id: inquiries.length + 1,
    name: body.name,
    email: body.email,
    phone: body.phone,
    serviceType: body.serviceType,
    message: body.message,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  };

  inquiries.push(newInquiry);
  writeInquiries(inquiries);

  // Send confirmation email to customer
  const customerEmailHtml = `
    <h2>Thank You for Your Inquiry</h2>
    <p>Hi ${body.name},</p>
    <p>We have received your inquiry about <strong>${body.serviceType}</strong>.</p>
    <p><strong>Your Details:</strong></p>
    <ul>
      <li>Service: ${body.serviceType}</li>
      <li>Email: ${body.email}</li>
      <li>Phone: ${body.phone}</li>
      <li>Message: ${body.message}</li>
    </ul>
    <p>Our team will review your inquiry and contact you soon.</p>
    <p>Thank you,<br/>Py Investigation Agency Team</p>
  `;

  await sendEmail(
    body.email,
    'Inquiry Received - Py Investigation Agency',
    customerEmailHtml
  );

  // Send notification email to admin
  const adminEmailHtml = `
    <h2>New Inquiry Received</h2>
    <p><strong>From:</strong> ${body.name}</p>
    <p><strong>Email:</strong> ${body.email}</p>
    <p><strong>Phone:</strong> ${body.phone}</p>
    <p><strong>Service:</strong> ${body.serviceType}</p>
    <p><strong>Message:</strong></p>
    <p>${body.message}</p>
    <p>Inquiry ID: ${newInquiry.id}</p>
  `;

  await sendEmail(
    'pyinvestigationagency@gmail.com',
    'New Inquiry Received',
    adminEmailHtml
  );

  return NextResponse.json(
    {
      success: true,
      data: newInquiry,
      message: 'Inquiry submitted successfully and emails sent',
    },
    { status: 201 }
  );
}
