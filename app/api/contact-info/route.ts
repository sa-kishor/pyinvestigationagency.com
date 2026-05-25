import { NextResponse } from 'next/server';

const contactInfo = [
  {
    id: 1,
    infoType: 'PHONE',
    value: '+919487979832',
    description: 'Primary contact phone number',
  },
  {
    id: 2,
    infoType: 'PHONE',
    value: '+917200841992',
    description: 'Alternative contact phone number',
  },
  {
    id: 3,
    infoType: 'WHATSAPP',
    value: '+919487979832',
    description: 'WhatsApp contact number',
  },
  {
    id: 4,
    infoType: 'WHATSAPP',
    value: '+917200841992',
    description: 'Alternative WhatsApp contact number',
  },
  {
    id: 5,
    infoType: 'EMAIL',
    value: 'pyinvestigationagency@gmail.com',
    description: 'Email address for inquiries',
  },
  {
    id: 6,
    infoType: 'ADDRESS',
    value: 'No 141A, 1st Floor, Opposite to Police Station, Cuddalore Main Road, Mudaliarpet, Pondicherry-605004',
    description: 'Office address',
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: contactInfo,
    message: 'Contact info retrieved successfully',
  });
}
