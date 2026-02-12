
import { Article, TrendingTopic, NewsCategory } from './types';

export const MOCK_TRENDS: TrendingTopic[] = [
  { id: 't1', topic: 'Global Summit on AI Governance', volume: '2.4M', change: '+15%', category: NewsCategory.POLITICS, description: 'World leaders gather in Geneva to discuss the first binding international treaty on artificial intelligence.', timestamp: new Date().toISOString() },
  { id: 't2', topic: 'Semiconductor Supply Chain Resilience', volume: '1.8M', change: '+5%', category: NewsCategory.BUSINESS, description: 'Major manufacturers pivot to diversified sourcing to avoid regional bottlenecks.', timestamp: new Date().toISOString() },
  { id: 't3', topic: 'Clean Energy Grid Integration', volume: '950K', change: '+12%', category: NewsCategory.SCIENCE, description: 'Breakthrough in battery storage technology enables 24/7 solar power for major metropolitan areas.', timestamp: new Date().toISOString() },
  { id: 't4', topic: 'The Future of Deep-Sea Exploration', volume: '700K', change: '+22%', category: NewsCategory.WORLD, description: 'New submersible technology reaches the deepest point of the Java Trench.', timestamp: new Date().toISOString() },
  { id: 't5', topic: 'Advancements in Gene Editing Therapy', volume: '500K', change: '+8%', category: NewsCategory.HEALTH, description: 'First successful trial of in-vivo CRISPR therapy for hereditary blindness reported.', timestamp: new Date().toISOString() },
  { id: 't6', topic: 'Digital Sovereignty in the EU', volume: '1.2M', change: '+30%', category: NewsCategory.POLITICS, description: 'New regulations aim to strengthen European control over data and cloud infrastructure.', timestamp: new Date().toISOString() },
];

const generateContent = (title: string, category: string) => `
## Executive Summary
This report analyzes the strategic implications of ${title} within the ${category} sector. As global markets fluctuate, the need for deep intelligence has never been more critical.

## Current Context
In the current geopolitical and economic landscape, ${title} represents a pivotal shift in how international actors engage with emerging paradigms. Recent data suggests a 15% uptick in direct engagement across the ${category} corridor.

## Key Developments
- **Strategic Realignment:** Organizations are pivoting toward resilient ${category} frameworks.
- **Resource Allocation:** Increased capital flow is targeting high-growth segments.
- **Regulatory Oversight:** New mandates are expected by Q3 2026.

## Editorial Insight
"The velocity of change in ${category} is unprecedented," notes a lead analyst at WorldPulse. "Staying ahead requires not just data, but synthesized insight into global momentum."

## Conclusion
The path forward for ${title} remains complex, but those with the foresight to adapt will secure a dominant position in the next era of global competition.
`;

const rawArticlesData = [
  // WORLD
  { cat: NewsCategory.WORLD, title: 'The Arctic Corridor: New Sovereignty Disputes', feat: true },
  { cat: NewsCategory.WORLD, title: 'Amazon Basin: Reforestation Milestones Reached', feat: false },
  { cat: NewsCategory.WORLD, title: 'Pacific Island Resilience: The Zero-Waste Model', feat: false },
  { cat: NewsCategory.WORLD, title: 'Sub-Saharan Tech Hubs: Africa’s Silicon Savannah', feat: false },
  { cat: NewsCategory.WORLD, title: 'Antarctic Research: Sub-Glacial Lake Discoveries', feat: false },
  { cat: NewsCategory.WORLD, title: 'Central Asian Logistics: The Middle Corridor Surge', feat: false },
  { cat: NewsCategory.WORLD, title: 'Nordic Defence: A Unified Strategic Command', feat: false },
  { cat: NewsCategory.WORLD, title: 'Mekong Delta: Climate-Adaptive Farming Shift', feat: false },
  { cat: NewsCategory.WORLD, title: 'Mediterranean Trade: The Return of Maritime Prowess', feat: false },
  { cat: NewsCategory.WORLD, title: 'Himalayan Hydropower: The Regional Energy Grid', feat: false },
  { cat: NewsCategory.WORLD, title: 'Latin American Lithium: The Mining Revolution', feat: false },
  { cat: NewsCategory.WORLD, title: 'Oceanic Governance: Protecting International Waters', feat: false },
  { cat: NewsCategory.WORLD, title: 'Trans-Atlantic Relations: Strengthening the Pivot', feat: false },

  // POLITICS
  { cat: NewsCategory.POLITICS, title: 'Estonia’s e-Democracy: 10 Years of Progress', feat: true },
  { cat: NewsCategory.POLITICS, title: 'EU Digital Markets Act: Phase 2 Implementation', feat: false },
  { cat: NewsCategory.POLITICS, title: 'Decentralized Governance: The Swiss Canton Model', feat: false },
  { cat: NewsCategory.POLITICS, title: 'Global Tax Reform: Closing the Loophole Gap', feat: false },
  { cat: NewsCategory.POLITICS, title: 'The Future of Non-Aligned Movements', feat: false },
  { cat: NewsCategory.POLITICS, title: 'Legislating AI: The First Binding Treaty', feat: false },
  { cat: NewsCategory.POLITICS, title: 'Campaign Finance: The Rise of Micro-Donations', feat: false },
  { cat: NewsCategory.POLITICS, title: 'Urban Autonomy: Cities as Political Actors', feat: false },
  { cat: NewsCategory.POLITICS, title: 'Post-Populism: The Return of Technocracy', feat: false },
  { cat: NewsCategory.POLITICS, title: 'Sovereignty in Space: Updating the Outer Space Treaty', feat: false },
  { cat: NewsCategory.POLITICS, title: 'Cyber-Diplomacy: Deterrence in the Digital Age', feat: false },
  { cat: NewsCategory.POLITICS, title: 'The Economics of Universal Basic Income Trials', feat: false },
  { cat: NewsCategory.POLITICS, title: 'Global Electoral Integrity: Blockchain\'s Role', feat: false },

  // BUSINESS
  { cat: NewsCategory.BUSINESS, title: 'Semiconductor War: The New Vertical Integration', feat: true },
  { cat: NewsCategory.BUSINESS, title: 'The Silver Economy: Wealth in the Aging Sector', feat: false },
  { cat: NewsCategory.BUSINESS, title: 'Green Hydrogen: Scaling the Energy Transition', feat: false },
  { cat: NewsCategory.BUSINESS, title: 'De-Dollarization Trends in Emerging Markets', feat: false },
  { cat: NewsCategory.BUSINESS, title: 'The Future of Work: Fully Autonomous Enterprise', feat: false },
  { cat: NewsCategory.BUSINESS, title: 'Supply Chain 4.0: Predictive Logistics Mapping', feat: false },
  { cat: NewsCategory.BUSINESS, title: 'Venture Capital: The Pivot to Hard-Tech', feat: false },
  { cat: NewsCategory.BUSINESS, title: 'Retail Reborn: The Phygital Experience Model', feat: false },
  { cat: NewsCategory.BUSINESS, title: 'ESG 2.0: Moving Beyond Marketing Compliance', feat: false },
  { cat: NewsCategory.BUSINESS, title: 'Micro-SaaS: The Rise of Hyper-Focused Software', feat: false },
  { cat: NewsCategory.BUSINESS, title: 'Carbon Credits: Creating a Transparent Market', feat: false },
  { cat: NewsCategory.BUSINESS, title: 'Remote Work Real Estate: The Urban Hub Pivot', feat: false },
  { cat: NewsCategory.BUSINESS, title: 'Fintech Sovereignty: National Payment Gateways', feat: false },

  // TECHNOLOGY
  { cat: NewsCategory.TECHNOLOGY, title: 'Quantum Supremacy: Beyond the Hype Cycle', feat: true },
  { cat: NewsCategory.TECHNOLOGY, title: '6G Horizons: Terahertz Wave Communications', feat: false },
  { cat: NewsCategory.TECHNOLOGY, title: 'Generative AI: The Copyright Crisis in Media', feat: false },
  { cat: NewsCategory.TECHNOLOGY, title: 'Solid-State Batteries: The EV Breakthrough', feat: false },
  { cat: NewsCategory.TECHNOLOGY, title: 'Edge Computing: The End of Cloud Centralization', feat: false },
  { cat: NewsCategory.TECHNOLOGY, title: 'Augmented Reality: The Future of Remote Surgery', feat: false },
  { cat: NewsCategory.TECHNOLOGY, title: 'Biotech Synergy: Computing with Neural Cells', feat: false },
  { cat: NewsCategory.TECHNOLOGY, title: 'Cybersecurity: Defending Against LLM-Botnets', feat: false },
  { cat: NewsCategory.TECHNOLOGY, title: 'Web3 Identity: Proof-of-Personhood Systems', feat: false },
  { cat: NewsCategory.TECHNOLOGY, title: 'Robotics in Agtech: The Fully Automated Farm', feat: false },
  { cat: NewsCategory.TECHNOLOGY, title: 'Privacy Tech: Zero-Knowledge Proofs at Scale', feat: false },
  { cat: NewsCategory.TECHNOLOGY, title: 'Humanoid Bots: The Entry into the Home Lab', feat: false },
  { cat: NewsCategory.TECHNOLOGY, title: 'Fusion Computing: Merging Silicon with Bio-Logic', feat: false },

  // HEALTH
  { cat: NewsCategory.HEALTH, title: 'mRNA Oncology: Personalizing Cancer Vaccines', feat: true },
  { cat: NewsCategory.HEALTH, title: 'Neuroplasticity: Reversing Cognitive Decline', feat: false },
  { cat: NewsCategory.HEALTH, title: 'Longevity Science: Cellular Reprogramming', feat: false },
  { cat: NewsCategory.HEALTH, title: 'Global Pandemic Preparedness: The Bio-Shield', feat: false },
  { cat: NewsCategory.HEALTH, title: 'Mental Health Tech: AI-Driven CBT Assistants', feat: false },
  { cat: NewsCategory.HEALTH, title: 'The Microbiome Frontier: Diet as Precision Medicine', feat: false },
  { cat: NewsCategory.HEALTH, title: 'Telemedicine in Conflict Zones: Remote Care', feat: false },
  { cat: NewsCategory.HEALTH, title: 'Synthetic Blood: Solving the Supply Crisis', feat: false },
  { cat: NewsCategory.HEALTH, title: 'Genome Sequencing: Making it Accessible to All', feat: false },
  { cat: NewsCategory.HEALTH, title: 'Sleep Optimization: The Science of High Performance', feat: false },
  { cat: NewsCategory.HEALTH, title: 'Wearable Biosensors: Continuous Vital Monitoring', feat: false },
  { cat: NewsCategory.HEALTH, title: 'Combating Antimicrobial Resistance: New Phage Therapy', feat: false },
  { cat: NewsCategory.HEALTH, title: 'Brain-Computer Interfaces: Helping Paralyzed Patients', feat: false },

  // SCIENCE
  { cat: NewsCategory.SCIENCE, title: 'James Webb: Imaging the First Stars in the Universe', feat: true },
  { cat: NewsCategory.SCIENCE, title: 'Nuclear Fusion: The Net Energy Gain Record', feat: false },
  { cat: NewsCategory.SCIENCE, title: 'Dark Matter Detectors: Closing in on the WIMP', feat: false },
  { cat: NewsCategory.SCIENCE, title: 'Gravitational Waves: A New Window into Black Holes', feat: false },
  { cat: NewsCategory.SCIENCE, title: 'Mars Colonization: The Ethics of Bio-Contamination', feat: false },
  { cat: NewsCategory.SCIENCE, title: 'Quantum Biology: Photosynthesis Re-examined', feat: false },
  { cat: NewsCategory.SCIENCE, title: 'The Anthropocene: Formalizing a New Geological Epoch', feat: false },
  { cat: NewsCategory.SCIENCE, title: 'Deep Sea Mining: The Ecosystem Trade-off', feat: false },
  { cat: NewsCategory.SCIENCE, title: 'Exoplanet Atmospheres: Searching for Biosignatures', feat: false },
  { cat: NewsCategory.SCIENCE, title: 'Synthetic Life: Creating the First Minimal Cell', feat: false },
  { cat: NewsCategory.SCIENCE, title: 'The Future of Timekeeping: Optical Atomic Clocks', feat: false },
  { cat: NewsCategory.SCIENCE, title: 'Plasma Physics: Clean Energy from the Stars', feat: false },
  { cat: NewsCategory.SCIENCE, title: 'Mycology: The Secret Network of Forest Intelligence', feat: false },

  // CULTURE
  { cat: NewsCategory.CULTURE, title: 'The AI Auteur: Algorithms in the Director’s Chair', feat: true },
  { cat: NewsCategory.CULTURE, title: 'Virtual Museums: Digitizing Humanity’s Heritage', feat: false },
  { cat: NewsCategory.CULTURE, title: 'Language Revitalization: AI Saving Native Tongues', feat: false },
  { cat: NewsCategory.CULTURE, title: 'Post-Digital Minimalism: The Analog Renaissance', feat: false },
  { cat: NewsCategory.CULTURE, title: 'Fashion 3.0: On-Demand 3D Printed Apparel', feat: false },
  { cat: NewsCategory.CULTURE, title: 'The Economics of the Creator Class', feat: false },
  { cat: NewsCategory.CULTURE, title: 'Brutalist Architecture: A Global Re-appreciation', feat: false },
  { cat: NewsCategory.CULTURE, title: 'Gastro-Diplomacy: Food as a Soft Power Asset', feat: false },
  { cat: NewsCategory.CULTURE, title: 'Immersive Theater: VR and the Stage', feat: false },
  { cat: NewsCategory.CULTURE, title: 'The New Ethics of Social Media Curation', feat: false },
  { cat: NewsCategory.CULTURE, title: 'Urban Soundscapes: The Science of City Noise', feat: false },
  { cat: NewsCategory.CULTURE, title: 'Digital Nomad Visas: Changing the Map of Citizenship', feat: false },
  { cat: NewsCategory.CULTURE, title: 'Cyber-Religions: The Spiritual Side of Tech', feat: false },

  // SPORTS
  { cat: NewsCategory.SPORTS, title: 'Biomechanical Athletes: Data-Driven Performance', feat: true },
  { cat: NewsCategory.SPORTS, title: 'The Global Expansion of Cricket: T20 Impact', feat: false },
  { cat: NewsCategory.SPORTS, title: 'Women’s Professional Leagues: Valuation Surge', feat: false },
  { cat: NewsCategory.SPORTS, title: 'The Ethics of Genetic Screening in Youth Sports', feat: false },
  { cat: NewsCategory.SPORTS, title: 'Esports at the Olympics: The Road to 2028', feat: false },
  { cat: NewsCategory.SPORTS, title: 'Sustainable Stadiums: Zero-Emission Venues', feat: false },
  { cat: NewsCategory.SPORTS, title: 'The Rise of Padel: Global Participation Trends', feat: false },
  { cat: NewsCategory.SPORTS, title: 'Formula 1: The Bio-Fuel Revolution', feat: false },
  { cat: NewsCategory.SPORTS, title: 'Endurance Sports: Breaking the 2-Hour Marathon Barrier', feat: false },
  { cat: NewsCategory.SPORTS, title: 'AI Coaching: Real-time Physiological Streaming', feat: false },
  { cat: NewsCategory.SPORTS, title: 'The Mental Health Revolution in Professional Sport', feat: false },
  { cat: NewsCategory.SPORTS, title: 'College Sports Nil: Changing the Amateur Landscape', feat: false },
  { cat: NewsCategory.SPORTS, title: 'Adventure Racing: The Extreme Limit of Human Will', feat: false },
];

export const MOCK_ARTICLES: Article[] = rawArticlesData.map((raw, i) => {
  const slug = raw.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return {
    id: `art-${i}`,
    title: raw.title,
    subheadline: `A comprehensive intelligence briefing on ${raw.title.toLowerCase()}.`,
    slug,
    excerpt: `Expert analysis and real-time data on ${raw.title.toLowerCase()} within the ${raw.cat} sector. Our intelligence network identifies this as a critical inflection point for global policy.`,
    content: generateContent(raw.title, raw.cat),
    category: raw.cat,
    image: `https://picsum.photos/seed/${i + 700}/1200/675`,
    imageAlt: `Strategic visualization of ${raw.title}. Analysis of ${raw.cat} trends.`,
    author: 'AI Editorial Desk',
    publishedAt: new Date(Date.now() - (i * 7200000)).toISOString(), // Spread over more time
    updatedAt: new Date(Date.now() - (i * 7200000)).toISOString(),
    tags: [raw.cat, 'Intelligence', 'Global', 'Report', 'Strategic'],
    readTime: `${7 + (i % 8)} min read`,
    faqs: [
      { question: 'Why is this trending?', answer: 'Global interest in this sector has spiked due to recent regulatory shifts and strategic realignment among major world powers.' },
      { question: 'What is the projected outcome?', answer: 'Initial modeling suggests a significant shift in resource allocation within the next 12-18 months.' }
    ],
    featured: raw.feat,
    pullQuote: `The evolution of ${raw.title.toLowerCase()} represents the fundamental bridge between contemporary policy and future stability.`,
    meta: {
      description: `In-depth investigation and strategic analysis of ${raw.title}. Part of WorldPulse's global intelligence feed.`,
      keywords: [raw.cat, 'Global News', 'Analysis', 'Strategic Intelligence', raw.title],
      canonical: `https://worldpulse.news/article/${slug}`
    }
  };
});
