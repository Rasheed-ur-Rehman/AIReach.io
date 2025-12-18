
import { ServiceType, ServiceDetail, Project, BlogPost } from './types';

export const SERVICES: ServiceDetail[] = [
  {
    id: ServiceType.WEB_DEV,
    title: 'Web Dev & AI',
    description: 'Bespoke AI-integrated web applications built with cutting-edge tech.',
    longDescription: 'We specialize in building ultra-fast, scalable, and intelligent web solutions. From custom CMS to complex AI integration, we leverage modern frameworks to deliver future-proof products.',
    technologies: ['React', 'Next.js', 'Node.js', 'Python', 'PHP', 'Laravel', 'TypeScript', 'Prisma'],
    tools: ['Vercel', 'AWS', 'Docker', 'Gemini API', 'OpenAI', 'Tailwind CSS'],
    features: ['Performance Optimization', 'AI Chatbot Integration', 'Responsive Design', 'API Development']
  },
  {
    id: ServiceType.SEO,
    title: 'SEO & Content',
    description: 'Data-driven SEO strategies and AI-assisted high-ranking content.',
    longDescription: 'Our approach combines traditional SEO wisdom with modern AI content generation. We don’t just rank; we convert.',
    technologies: ['Keyword Research', 'Technical SEO', 'On-Page SEO', 'Backlink Strategy'],
    tools: ['Ahrefs', 'SEMrush', 'SurferSEO', 'Jasper', 'Google Search Console'],
    features: ['Content Audits', 'Competitor Analysis', 'Copywriting', 'Local SEO']
  },
  {
    id: ServiceType.GRAPHIC_DESIGN,
    title: 'Graphic Design',
    description: 'Stunning visual identities and high-fidelity UI/UX designs.',
    longDescription: 'Visual storytelling that resonates. We merge human creativity with AI graphic tools to produce unique brand assets.',
    technologies: ['Brand Identity', 'UI/UX Design', '3D Modeling', 'Motion Graphics'],
    tools: ['Figma', 'Adobe Creative Cloud', 'Midjourney', 'Canva Pro', 'Blender'],
    features: ['Logo Design', 'Design Systems', 'Social Media Kits', 'Print Design']
  },
  {
    id: ServiceType.VIDEO_EDITING,
    title: 'Video Editing',
    description: 'Cinematic storytelling and high-impact motion visuals.',
    longDescription: 'Dynamic video content optimized for all platforms. From commercials to social clips, we bring your vision to life.',
    technologies: ['Color Grading', 'Sound Design', 'Visual Effects (VFX)', 'Animation'],
    tools: ['Adobe Premiere Pro', 'DaVinci Resolve', 'After Effects', 'CapCut Desktop'],
    features: ['Video Ads', 'Explainer Videos', 'Podcast Editing', 'Cinematic Trailers']
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-commerce Evolution',
    category: ServiceType.WEB_DEV,
    image: 'https://picsum.photos/seed/p1/800/600',
    tags: ['Next.js', 'Stripe', 'AI-Search'],
    description: 'A futuristic shopping experience with AI product recommendations.'
  },
  {
    id: '2',
    title: 'SaaS Dashboard Pro',
    category: ServiceType.WEB_DEV,
    image: 'https://picsum.photos/seed/p2/800/600',
    tags: ['React', 'D3.js', 'Node.js'],
    description: 'Analytics engine for global logistics enterprise.'
  },
  {
    id: '3',
    title: 'Cyberpunk Brand ID',
    category: ServiceType.GRAPHIC_DESIGN,
    image: 'https://picsum.photos/seed/p3/800/600',
    tags: ['Figma', 'Brand Book', 'Motion'],
    description: 'Full identity design for a tech startup in Tokyo.'
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'The Impact of AI on Modern Web Development',
    excerpt: 'Explore how generative AI is reshaping the way developers write code and design systems.',
    content: 'Long form content about AI in web dev...',
    date: 'Oct 24, 2024',
    category: 'Technology',
    image: 'https://picsum.photos/seed/b1/800/400'
  },
  {
    id: '2',
    title: 'SEO Secrets: Why Technical Optimization is Non-Negotiable',
    excerpt: 'Search engines are smarter than ever. Learn the technical nuances of modern SEO.',
    content: 'Long form content about SEO...',
    date: 'Oct 22, 2024',
    category: 'Marketing',
    image: 'https://picsum.photos/seed/b2/800/400'
  }
];
