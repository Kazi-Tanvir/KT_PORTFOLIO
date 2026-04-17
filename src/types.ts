export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  category: string;
}

export interface Skill {
  id?: number;
  name: string;
  icon: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface Education {
  id?: number;
  period: string;
  degree: string;
  institution: string;
  description: string;
  active?: boolean;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  payload: string;
  createdAt: string;
}
