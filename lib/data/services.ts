export type ServiceItem = {
  id: string
  title: string
  slug: string
  icon:
    | 'Heart'
    | 'UserCheck'
    | 'Building2'
    | 'ShieldCheck'
    | 'Fingerprint'
    | 'Search'
    | 'Laptop'
  shortDesc: string
  fullDesc: string
  whatIs: string
  features: string[]
  process: Array<{ step: number; title: string; desc: string }>
  whyChoose: string
  related: string[]
}

export const services: ServiceItem[] = [
  {
    id: 'pre-matrimonial',
    title: 'Pre-Matrimonial Checks',
    slug: '/services/pre-matrimonial',
    icon: 'Heart',
    shortDesc:
      'Verify background, character, financials, and lifestyle before making a lifelong commitment.',
    fullDesc:
      'Our pre-matrimonial investigation service verifies identity, lifestyle, family credibility, social conduct, and financial standing to protect your future with factual clarity.',
    whatIs:
      'Pre-matrimonial investigation is a confidential due-diligence process conducted before marriage to validate facts and prevent emotional, social, and financial risk.',
    features: [
      'Personal background verification',
      'Financial status and debt check',
      'Criminal record verification',
      'Behavioral and social reputation assessment',
      'Family background research',
      'Digital footprint and online identity review',
    ],
    process: [
      { step: 1, title: 'Initial Consultation', desc: 'Private consultation to define investigation scope.' },
      { step: 2, title: 'Field Investigation', desc: 'Discreet ground checks by local intelligence agents.' },
      { step: 3, title: 'Evidence Validation', desc: 'Cross-verification of facts using reliable sources.' },
      { step: 4, title: 'Secure Reporting', desc: 'Confidential report with documented findings.' },
    ],
    whyChoose:
      'Our team combines local field intelligence with strict discretion to provide accurate insights without exposing client identity.',
    related: ['post-matrimonial', 'asset-tracing', 'cyber-crime'],
  },
  {
    id: 'post-matrimonial',
    title: 'Post-Matrimonial Investigation',
    slug: '/services/post-matrimonial',
    icon: 'UserCheck',
    shortDesc:
      'Resolve marital doubts with evidence-backed investigation and discreet surveillance operations.',
    fullDesc:
      'Our post-matrimonial investigation helps clients verify suspicious activity, hidden relationships, financial concealment, and behavioral inconsistencies with legal-grade documentation.',
    whatIs:
      'Post-matrimonial investigation is a sensitive service for spouses seeking clarity in cases of mistrust, infidelity, or suspicious financial behavior.',
    features: [
      'Infidelity and behavioral investigation',
      'Routine surveillance and movement analysis',
      'Financial concealment tracking',
      'Social association mapping',
      'Evidence documentation for legal consultation',
      'Timeline and incident reconstruction',
    ],
    process: [
      { step: 1, title: 'Case Briefing', desc: 'Understand concerns, timelines, and expected outcomes.' },
      { step: 2, title: 'Covert Monitoring', desc: 'Discreet surveillance and pattern tracking.' },
      { step: 3, title: 'Evidence Archival', desc: 'Collect and preserve verifiable evidence.' },
      { step: 4, title: 'Final Delivery', desc: 'Submit a detailed confidential report.' },
    ],
    whyChoose:
      'We manage emotionally sensitive cases with discipline, privacy, and factual reporting to support informed personal and legal decisions.',
    related: ['pre-matrimonial', 'forensic-investigation', 'asset-tracing'],
  },
  {
    id: 'corporate-investigation',
    title: 'Corporate Investigation',
    slug: '/services/corporate-investigation',
    icon: 'Building2',
    shortDesc: 'Protect your business from fraud, internal theft, compliance risks, and corporate misconduct.',
    fullDesc:
      'We investigate corporate fraud, procurement manipulation, partner due diligence gaps, and internal collusion to protect organizational integrity and shareholder confidence.',
    whatIs:
      'Corporate investigation is a strategic intelligence service that helps businesses identify hidden risk, misconduct, and policy violations.',
    features: [
      'Internal fraud detection',
      'Vendor and partner due diligence',
      'Intellectual property misuse investigation',
      'Workplace misconduct investigation',
      'Competitive intelligence validation',
      'Compliance breach documentation',
    ],
    process: [
      { step: 1, title: 'Risk Mapping', desc: 'Define departments, actors, and risk indicators.' },
      { step: 2, title: 'Evidence Collection', desc: 'Collect digital, financial, and human-source evidence.' },
      { step: 3, title: 'Forensic Correlation', desc: 'Correlate facts into defensible findings.' },
      { step: 4, title: 'Executive Brief', desc: 'Deliver actionable intelligence report.' },
    ],
    whyChoose:
      'Our investigators understand board-level confidentiality and deliver evidence-based intelligence that leadership teams can act on immediately.',
    related: ['employee-verification', 'forensic-investigation', 'cyber-crime'],
  },
  {
    id: 'employee-verification',
    title: 'Employee Verification',
    slug: '/services/employee-verification',
    icon: 'ShieldCheck',
    shortDesc: 'Screen candidates and employees with reliable background checks to reduce hiring risk.',
    fullDesc:
      'Our employee verification service validates identity, education, employment history, criminal records, and behavior signals before onboarding critical talent.',
    whatIs:
      'Employee verification is a pre-employment and ongoing screening process that strengthens trust and compliance within organizations.',
    features: [
      'Identity and address verification',
      'Education and certification checks',
      'Previous employment verification',
      'Criminal and civil background review',
      'Reference validation',
      'Behavioral red-flag assessment',
    ],
    process: [
      { step: 1, title: 'Requirement Intake', desc: 'Align role sensitivity with verification depth.' },
      { step: 2, title: 'Document Validation', desc: 'Authenticate provided records and claims.' },
      { step: 3, title: 'Reference Investigation', desc: 'Verify references and employment reputation.' },
      { step: 4, title: 'Decision Report', desc: 'Deliver clear risk summary for hiring teams.' },
    ],
    whyChoose:
      'We deliver fast-turnaround, factual verification reports that HR and leadership teams can confidently rely on.',
    related: ['corporate-investigation', 'cyber-crime', 'forensic-investigation'],
  },
  {
    id: 'forensic-investigation',
    title: 'Forensic Investigation',
    slug: '/services/forensic-investigation',
    icon: 'Fingerprint',
    shortDesc: 'Scientific evidence analysis for legal, corporate, and personal investigation requirements.',
    fullDesc:
      'Our forensic investigation services include document examination, digital evidence preservation, trace analysis coordination, and report preparation for legal support.',
    whatIs:
      'Forensic investigation applies scientific and procedural methods to examine evidence and establish factual conclusions for disputes and legal proceedings.',
    features: [
      'Document and signature examination support',
      'Digital evidence preservation',
      'Incident reconstruction support',
      'Fraud evidence correlation',
      'Chain-of-custody documentation',
      'Forensic briefing for legal teams',
    ],
    process: [
      { step: 1, title: 'Evidence Intake', desc: 'Catalog and secure all available materials.' },
      { step: 2, title: 'Technical Examination', desc: 'Apply forensic protocols to inspect evidence.' },
      { step: 3, title: 'Analytical Reporting', desc: 'Translate findings into clear conclusions.' },
      { step: 4, title: 'Case Support', desc: 'Support legal and strategic case preparation.' },
    ],
    whyChoose:
      'We maintain procedural rigor and evidentiary discipline, ensuring each finding is credible, structured, and defensible.',
    related: ['cyber-crime', 'corporate-investigation', 'post-matrimonial'],
  },
  {
    id: 'asset-tracing',
    title: 'Asset Tracing',
    slug: '/services/asset-tracing',
    icon: 'Search',
    shortDesc: 'Track concealed assets and financial trails for legal, matrimonial, and business disputes.',
    fullDesc:
      'Asset tracing identifies hidden ownership structures, undeclared properties, and indirect financial holdings through legal-source intelligence and verification.',
    whatIs:
      'Asset tracing is an investigative process that maps ownership and financial links to locate concealed movable and immovable assets.',
    features: [
      'Property and ownership verification',
      'Business interest mapping',
      'Financial relationship tracing',
      'Hidden asset intelligence',
      'Lifestyle vs declared income analysis',
      'Evidence support for legal strategy',
    ],
    process: [
      { step: 1, title: 'Subject Profiling', desc: 'Build profile from known identifiers and leads.' },
      { step: 2, title: 'Intelligence Research', desc: 'Track linked entities and ownership trails.' },
      { step: 3, title: 'Ground Validation', desc: 'Validate records through discreet field checks.' },
      { step: 4, title: 'Asset Dossier', desc: 'Deliver structured report of traced assets.' },
    ],
    whyChoose:
      'Our investigators combine document intelligence with field verification to expose complex asset concealment patterns.',
    related: ['post-matrimonial', 'corporate-investigation', 'pre-matrimonial'],
  },
  {
    id: 'cyber-crime',
    title: 'Cyber Crime & Forensics',
    slug: '/services/cyber-crime',
    icon: 'Laptop',
    shortDesc: 'Investigate cyber threats, stalking, account compromise, and digital fraud with precision.',
    fullDesc:
      'Our cyber crime team handles digital harassment, account breaches, cyber fraud indicators, and online impersonation with forensic protocol and evidence preservation.',
    whatIs:
      'Cyber crime investigation identifies and documents malicious digital behavior, helping victims and organizations respond with legal and operational clarity.',
    features: [
      'Cyber stalking and harassment investigation',
      'Account compromise and impersonation analysis',
      'Digital fraud signal investigation',
      'Metadata and timeline analysis',
      'Social media intelligence review',
      'Digital evidence preservation',
    ],
    process: [
      { step: 1, title: 'Incident Assessment', desc: 'Assess digital threat vectors and impact.' },
      { step: 2, title: 'Forensic Capture', desc: 'Preserve logs, records, and digital artifacts.' },
      { step: 3, title: 'Pattern Analysis', desc: 'Identify actors, intent, and attack pathway.' },
      { step: 4, title: 'Action Report', desc: 'Provide response-ready forensic findings.' },
    ],
    whyChoose:
      'We operate with speed and digital forensic discipline to preserve volatile evidence and help clients act confidently.',
    related: ['forensic-investigation', 'corporate-investigation', 'employee-verification'],
  },
]

export const investigationTypes = [
  'Pre-Matrimonial',
  'Post-Matrimonial',
  'Corporate',
  'Employee Verification',
  'Forensic',
  'Asset Tracing',
  'Cyber Crime',
  'Other',
]
