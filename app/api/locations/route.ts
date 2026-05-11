import { NextResponse } from 'next/server';

const locations = [
  {
    id: 1,
    city: 'Pondicherry',
    region: 'Union Territory',
    description: 'Py Investigation Agency operates with a strong field network across Puducherry with trained investigators for discreet investigations in urban and semi-urban contexts.',
  },
  {
    id: 2,
    city: 'Tamil Nadu',
    region: 'State',
    description: 'We deliver consistent investigative quality across Tamil Nadu with strict confidentiality and evidence-backed reporting.',
  },
  {
    id: 3,
    city: 'Bangalore',
    region: 'State',
    description: 'Our investigators are trained to manage investigations in Bangalore with expertise in evidence gathering and discreet operations.',
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: locations,
    message: 'Locations retrieved successfully',
  });
}
