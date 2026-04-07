


export interface CourseBlock {
  blockNumber: number;
  date?: string;
  title: string;
  bookReview?: {
    title: string;
    author: string;
  };
  topics: string[];
}

export interface InfoCardData {
    iconName: 'CalendarIcon' | 'MapPinIcon' | 'HomeIcon' | 'UsersIcon' | 'CoffeeIcon' | 'HelpCircleIcon';
    title: string;
    content: string;
}

export interface KeyBenefit {
  iconName: 'SparklesIcon' | 'UsersIcon' | 'BookOpenIcon' | 'BookIcon' | 'ShieldIcon';
  title: string;
  description: string;
}

export interface Course {
  id: string;
  iconName: 'UsersIcon' | 'SparklesIcon' | 'ShieldIcon';
  title: string;
  subtitle: string;
  description: string;
  keyBenefits: KeyBenefit[];
  details: InfoCardData[];
  themes: string[];
  blocks: CourseBlock[];
  literature: {
    title: string;
    author: string;
  }[];
  miscInfo: InfoCardData[];
}

export interface ResourceFile {
  name: string;
  path: string;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isNewUser?: boolean;
}