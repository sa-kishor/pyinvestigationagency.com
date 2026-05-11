import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

// Helper function to convert JSON to CSV
function jsonToCSV(data: any[], headers: string[]): string {
  const csvHeaders = headers.join(',');
  const csvRows = data.map(row => {
    return headers.map(header => {
      const value = row[header];
      const escapedValue = String(value || '').replace(/"/g, '""');
      return `"${escapedValue}"`;
    }).join(',');
  });
  return [csvHeaders, ...csvRows].join('\n');
}

// Send data as CSV email
async function sendEmailWithCSV(to: string, subject: string, csvContent: string, filename: string) {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.log('⚠️ RESEND_API_KEY not configured - email not sent');
    return false;
  }

  try {
    // Convert CSV to base64 for attachment
    const base64Content = Buffer.from(csvContent).toString('base64');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@resend.dev',
        to: to,
        subject: subject,
        html: `
          <h2>${subject}</h2>
          <p>Attached is your exported data in CSV format.</p>
          <p><strong>Filename:</strong> ${filename}</p>
          <p><strong>Exported:</strong> ${new Date().toLocaleString()}</p>
          <hr/>
          <p>This is an automated email from Py Investigation Agency.</p>
        `,
        attachments: [
          {
            filename: filename,
            content: base64Content,
          }
        ]
      }),
    });

    if (response.ok) {
      console.log(`✅ Email sent to ${to}`);
      return true;
    } else {
      console.log('❌ Failed to send email');
      return false;
    }
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, email } = body;

    if (!type || !email) {
      return NextResponse.json(
        { error: 'Type and email are required' },
        { status: 400 }
      );
    }

    let data: any[] = [];
    let filename = '';
    let subject = '';

    if (type === 'inquiries') {
      const filePath = path.join(DATA_DIR, 'inquiries.json');
      if (!fs.existsSync(filePath)) {
        return NextResponse.json(
          { error: 'No inquiries data found' },
          { status: 404 }
        );
      }
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(fileContent);
      data = parsed.inquiries || [];
      filename = `inquiries-${new Date().toISOString().split('T')[0]}.csv`;
      subject = `Contact Form Inquiries Export - ${data.length} submissions`;
    } else if (type === 'testimonials') {
      const filePath = path.join(DATA_DIR, 'testimonials.json');
      if (!fs.existsSync(filePath)) {
        return NextResponse.json(
          { error: 'No testimonials data found' },
          { status: 404 }
        );
      }
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(fileContent);
      data = parsed.testimonials || [];
      filename = `testimonials-${new Date().toISOString().split('T')[0]}.csv`;
      subject = `Customer Reviews Export - ${data.length} testimonials`;
    } else {
      return NextResponse.json(
        { error: 'Invalid type' },
        { status: 400 }
      );
    }

    // Generate CSV
    let csvContent = '';
    if (type === 'inquiries') {
      const headers = ['ID', 'Name', 'Email', 'Phone', 'Service Type', 'Message', 'Status', 'Date'];
      csvContent = jsonToCSV(
        data.map(item => ({
          'ID': item.id,
          'Name': item.name,
          'Email': item.email,
          'Phone': item.phone,
          'Service Type': item.serviceType,
          'Message': item.message,
          'Status': item.status,
          'Date': item.createdAt
        })),
        headers
      );
    } else if (type === 'testimonials') {
      const headers = ['ID', 'Name', 'Review', 'Date', 'Submitted Date'];
      csvContent = jsonToCSV(
        data.map(item => ({
          'ID': item.id,
          'Name': item.name,
          'Review': item.quote,
          'Date': item.date,
          'Submitted Date': item.createdAt
        })),
        headers
      );
    }

    // Send email with CSV
    const emailSent = await sendEmailWithCSV(email, subject, csvContent, filename);

    return NextResponse.json({
      success: true,
      message: `CSV exported and email sent to ${email}`,
      count: data.length,
      emailSent: emailSent,
      filename: filename,
    });
  } catch (error: any) {
    console.error('Export email error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to export and send email' },
      { status: 500 }
    );
  }
}
