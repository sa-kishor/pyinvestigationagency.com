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
      // Escape quotes and wrap in quotes if contains comma
      const escapedValue = String(value || '').replace(/"/g, '""');
      return `"${escapedValue}"`;
    }).join(',');
  });
  return [csvHeaders, ...csvRows].join('\n');
}

// Export inquiries as CSV
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type'); // 'inquiries' or 'testimonials'
  const format = searchParams.get('format'); // 'csv' or 'json'

  try {
    let data: any[] = [];
    let filename = '';

    if (type === 'inquiries') {
      const filePath = path.join(DATA_DIR, 'inquiries.json');
      if (!fs.existsSync(filePath)) {
        return NextResponse.json({ type, count: 0, data: [], exportDate: new Date().toISOString() });
      }
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(fileContent);
      data = Array.isArray(parsed) ? parsed : parsed.inquiries || [];
      filename = 'inquiries';
    } else if (type === 'visitors') {
      const filePath = path.join(DATA_DIR, 'visitors.json');
      if (!fs.existsSync(filePath)) {
        return NextResponse.json({ type, count: 0, data: [], exportDate: new Date().toISOString() });
      }
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(fileContent);
      data = Array.isArray(parsed) ? parsed : parsed.visitors || [];
      filename = 'visitors';
    } else if (type === 'testimonials') {
      const filePath = path.join(DATA_DIR, 'testimonials.json');
      if (!fs.existsSync(filePath)) {
        return NextResponse.json({ type, count: 0, data: [], exportDate: new Date().toISOString() });
      }
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(fileContent);
      data = Array.isArray(parsed) ? parsed : parsed.testimonials || [];
      filename = 'testimonials';
    }

    if (format === 'csv') {
      let csvContent = '';
      let headers: string[] = [];

      if (type === 'inquiries') {
        headers = ['ID', 'Name', 'Email', 'Phone', 'Service Type', 'Message', 'Status', 'Date'];
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
      } else if (type === 'visitors') {
        headers = ['ID', 'Full Name', 'Phone Number', 'WhatsApp Number', 'Email', 'Submitted At'];
        csvContent = jsonToCSV(
          data.map(item => ({
            'ID': item.id,
            'Full Name': item.fullName,
            'Phone Number': item.phoneNumber,
            'WhatsApp Number': item.whatsappNumber || 'N/A',
            'Email': item.email,
            'Submitted At': item.submittedAt
          })),
          headers
        );
      } else if (type === 'testimonials') {
        headers = ['ID', 'Name', 'Email', 'Rating', 'Review', 'Date'];
        csvContent = jsonToCSV(
          data.map(item => ({
            'ID': item.id,
            'Name': item.name,
            'Email': item.email || '',
            'Rating': item.rating || 5,
            'Review': item.quote || item.text || '',
            'Date': item.createdAt || item.date
          })),
          headers
        );
      }

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${filename}-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    } else {
      // Return as JSON
      return NextResponse.json({
        type,
        count: data.length,
        data,
        exportDate: new Date().toISOString(),
      });
    }
  } catch (error: any) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to export data' },
      { status: 500 }
    );
  }
}
