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
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(fileContent);
      data = parsed.inquiries || [];
      filename = 'inquiries';
    } else if (type === 'testimonials') {
      const filePath = path.join(DATA_DIR, 'testimonials.json');
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(fileContent);
      data = parsed.testimonials || [];
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
      } else if (type === 'testimonials') {
        headers = ['ID', 'Name', 'Review', 'Date', 'Submitted Date'];
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
