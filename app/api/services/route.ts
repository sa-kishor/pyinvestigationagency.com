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
  {
    id: 3,
    serviceId: 'cyber-crime',
    title: 'Cyber Crime Investigation',
    slug: 'cyber-crime',
    icon: '💻',
    shortDesc: 'Digital crime investigation services',
    fullDesc: 'Expert investigation of cyber crimes, data breaches, and online fraud.',
    whatIs: 'Cyber crime investigation involves identifying and investigating online criminal activities.',
    whyChoose: 'Our team has expertise in digital forensics and cybersecurity.',
    features: ['Data breach investigation', 'Fraud detection', 'Digital forensics', 'Threat analysis'],
    process: [
      { step: 1, title: 'Incident Report', desc: 'Document the cyber incident' },
      { step: 2, title: 'Forensic Analysis', desc: 'Detailed digital investigation' },
      { step: 3, title: 'Evidence Report', desc: 'Comprehensive findings report' },
    ],
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: services,
    message: 'Services retrieved successfully',
  });
}
