import { NextResponse } from 'next/server';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import path from 'path';
import { sendWhatsAppNotification } from '@/lib/services/notifications';

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
        from: 'onboarding@resend.dev',
        to: to,
        subject: subject,
        html: html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Email send failed:', error);
    } else {
      console.log('✓ Email sent to', to);
    }
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
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a1a;">Thank You for Your Inquiry</h2>
      <p>Hi ${body.name},</p>
      <p><strong>Thank you! We received your inquiry. Check your email for confirmation.</strong></p>
      
      <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #d4af37; margin: 20px 0;">
        <p><strong>Your Inquiry Details:</strong></p>
        <p>Service: ${body.serviceType}</p>
        <p>Phone: ${body.phone}</p>
        <p>Email: ${body.email}</p>
        ${body.message ? `<p>Message: ${body.message}</p>` : ''}
      </div>

      <p style="color: #666; font-size: 12px; margin-top: 30px;">
        <strong>Py Investigation Agency</strong><br>
        No 141A, 1st Floor, Opposite to Police Station<br>
        Cuddalore Main Road, Mudaliarpet, Pondicherry-605004<br>
        Phone: +919487979832 | +917200841992
      </p>
    </div>
  `;

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
    body.email,
    'Inquiry Received - Py Investigation Agency',
    customerEmailHtml
  );

  await sendEmail(
    'pyinvestigationagency@gmail.com',
    'New Inquiry Received',
    adminEmailHtml
  );

  // Send WhatsApp notification to both owner numbers
  const ownerNumbers = ['+919487979832', '+917200841992'];
  const whatsappMessage = `
🔔 New Inquiry Received!

Name: ${body.name}
Phone: ${body.phone}
Email: ${body.email}
Service: ${body.serviceType}

Message: ${body.message}

Time: ${new Date().toLocaleString()}
  `.trim();

  for (const number of ownerNumbers) {
    try {
      await sendWhatsAppNotification(number, whatsappMessage);
    } catch (error) {
      console.error(`Failed to send WhatsApp to ${number}:`, error);
    }
  }

  return NextResponse.json(
    {
      success: true,
      data: newInquiry,
      message: 'Inquiry submitted successfully and emails sent',
    },
    { status: 201 }
  );
}
