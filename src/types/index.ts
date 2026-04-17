export type Lang = 'ja' | 'en';
export type SkillCategory = 'language' | 'framework' | 'tool';
export type SkillLevel = 1 | 2 | 3 | 4 | 5;
export type ProductStatus = 'completed' | 'in-progress';
export type BlogCategory = 'Featured' | 'New' | 'Learn' | 'Enjoy' | 'Real';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level?: SkillLevel;
  iconUrl?: string;
}

export interface Product {
  id: string;
  title: string;
  description: {
    ja: string;
    en: string;
  };
  status: ProductStatus;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  order: number;
}

export interface BlogPostFrontmatter {
  title: string;
  date: string;
  category: BlogCategory;
  tags: string[];
  summary: string;
  lang: Lang;
  translationSlug?: string;
  draft?: boolean;
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string;
  content: string;
  readingTime: number;
}

export interface LocaleData {
  nav: {
    home: string;
    about: string;
    skills: string;
    products: string;
    blog: string;
    contact: string;
  };
  home: {
    catchcopy: string;
    subtitle: string;
    viewWork: string;
    contactMe: string;
  };
  about: {
    title: string;
    eyebrow: string;
    bio: string;
    careerTitle: string;
  };
  skills: {
    title: string;
    eyebrow: string;
    categories: {
      language: string;
      framework: string;
      tool: string;
    };
    levelLabel: string;
  };
  products: {
    title: string;
    eyebrow: string;
    status: {
      completed: string;
      'in-progress': string;
    };
    github: string;
    demo: string;
    noProducts: string;
  };
  blog: {
    title: string;
    eyebrow: string;
    categories: Record<BlogCategory, string>;
    allCategory: string;
    readMore: string;
    readingTime: string;
    noPosts: string;
    backToList: string;
    previousPage: string;
    nextPage: string;
    showMore: string;
  };
  contact: {
    title: string;
    eyebrow: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successMessage: string;
    errorMessage: string;
    validation: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      phoneInvalid: string;
      messageRequired: string;
      messageTooShort: string;
      messageTooLong: string;
    };
  };
  notFound: {
    title: string;
    message: string;
    backHome: string;
  };
  footer: {
    copyright: string;
  };
}
