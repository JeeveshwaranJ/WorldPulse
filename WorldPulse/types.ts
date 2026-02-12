
export interface Article {
  id: string;
  title: string;
  subheadline: string;
  slug: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  image: string;
  imageAlt: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  readTime: string;
  faqs: { question: string; answer: string }[];
  pullQuote?: string;
  featured: boolean;
  meta: {
    description: string;
    keywords: string[];
    canonical: string;
  };
}

export interface TrendingTopic {
  id: string;
  topic: string;
  volume: string;
  change: string;
  category: NewsCategory;
  description: string;
  timestamp: string;
}

export enum NewsCategory {
  WORLD = 'World',
  POLITICS = 'Politics',
  BUSINESS = 'Business',
  TECHNOLOGY = 'Technology',
  HEALTH = 'Health',
  SCIENCE = 'Science',
  CULTURE = 'Culture',
  SPORTS = 'Sports'
}

export interface GenerationLog {
  id: string;
  topic: string;
  status: 'success' | 'failed' | 'processing';
  timestamp: string;
  model: string;
}
