
export enum ServiceType {
  WEB_DEV = 'web-development',
  SEO = 'seo-content',
  GRAPHIC_DESIGN = 'graphic-design',
  VIDEO_EDITING = 'video-editing'
}

export interface ServiceDetail {
  id: ServiceType;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  tools: string[];
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  category: ServiceType;
  image: string;
  tags: string[];
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}
