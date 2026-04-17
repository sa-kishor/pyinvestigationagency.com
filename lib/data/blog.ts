export type BlogPost = {
  id: number
  title: string
  category: string
  excerpt: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Why Investigation Before Marriage is Crucial?',
    category: 'Matrimonial',
    excerpt:
      'Understand how pre-matrimonial intelligence helps verify identity, financial stability, and social credibility before marriage.',
  },
  {
    id: 2,
    title: "5 Signs of Corporate Fraud You Shouldn't Ignore",
    category: 'Corporate',
    excerpt:
      'Learn the operational and behavioral indicators that often signal procurement fraud, data leakage, or internal collusion.',
  },
  {
    id: 3,
    title: 'Preventing Cyber Stalking: A Complete Guide',
    category: 'Cyber Safety',
    excerpt:
      'A practical framework for preserving evidence, reducing digital exposure, and taking timely action against cyber stalking threats.',
  },
  {
    id: 4,
    title: 'How Employee Background Checks Protect Your Business',
    category: 'Corporate',
    excerpt:
      'Robust background verification minimizes insider risk, strengthens workplace trust, and improves compliance outcomes.',
  },
  {
    id: 5,
    title: 'Asset Tracing in Divorce Cases: What You Need to Know',
    category: 'Legal',
    excerpt:
      'Discover how asset tracing uncovers hidden ownership and financial patterns relevant to matrimonial legal proceedings.',
  },
  {
    id: 6,
    title: 'Post-Matrimonial Investigation: When to Seek Help',
    category: 'Matrimonial',
    excerpt:
      'Know the right time to seek professional investigation when trust concerns arise in a marriage.',
  },
]
