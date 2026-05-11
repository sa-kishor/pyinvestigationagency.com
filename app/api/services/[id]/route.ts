import { NextResponse } from 'next/server';

const services = [
  {
    id: 1,
    serviceId: 'asset-tracing',
    title: 'Asset Tracing',
    slug: 'asset-tracing',
    icon: '🔍',
    shortDesc: 'Locate and trace hidden assets',
    fullDesc: 'Our expert investigators locate and trace hidden assets across multiple jurisdictions.',
    whatIs: 'Asset tracing is the process of investigating and locating assets that may be hidden or transferred.',
    whyChoose: 'We have years of experience in tracing assets in complex financial situations.',
    features: ['Bank account tracing', 'Property location', 'Vehicle tracking', 'Digital asset identification'],
    process: [
      { step: 1, title: 'Initial Consultation', desc: 'Understand your requirements' },
      { step: 2, title: 'Investigation', desc: 'Thorough research and tracing' },
      { step: 3, title: 'Report', desc: 'Detailed findings report' },
    ],
  },
  {
    id: 2,
    serviceId: 'employee-verification',
    title: 'Employee Verification',
    slug: 'employee-verification',
    icon: '👤',
    shortDesc: 'Complete background checks for employees',
    fullDesc: 'Comprehensive employee background verification to ensure you hire the right people.',
    whatIs: 'Employee verification involves checking employment history, education, and criminal records.',
    whyChoose: 'We provide thorough and reliable employee background checks.',
    features: ['Background check', 'Reference verification', 'Education verification', 'Criminal record check'],
    process: [
      { step: 1, title: 'Candidate Details', desc: 'Collect candidate information' },
      { step: 2, title: 'Verification', desc: 'Verify all details' },
      { step: 3, title: 'Report', desc: 'Provide verification report' },
    ],
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const service = services.find(s => s.id === id);

  if (!service) {
    return NextResponse.json(
      { success: false, message: 'Service not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: service,
  });
}
