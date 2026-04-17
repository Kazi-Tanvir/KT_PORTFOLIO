import { Project, Skill, Education } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Project_Neon_Engine',
    description: 'A high-frequency dashboard for real-time digital asset tracking with 0.2ms latency across distributed nodes.',
    tags: ['Full-Stack', 'Next.js'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvOVaGXuSUfGfgMbTMiGE-Y2_PDN1qlC4yAUckipymnaB3FH2DkZcL7MbuoAWPZ2NwmegyDqCmqwhBnRA_sZh6t10MkgIMha2WYF-wiP40m3ww4ByBdPY_1UbXrSoBFFSG3bDFjB7t2aca42y0wGzHbM281KJPaPEAybuVA3u_ifUWfd73v_GUnKu_v5Fo7br3Lrnbk5glqv2nJ4AQgGP69M7j7yB5A-Y-nV4bgpTLxp1qO7zZGBNSHBhAWtd9Pyki44Xdt-WDzJU',
    link: '#',
    category: 'Full-Stack'
  },
  {
    id: '2',
    title: 'Monolith_API',
    description: 'Customized architectural API gateway handling 100k+ concurrent requests with integrated GraphQL optimization layers.',
    tags: ['Backend', 'Node.js'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ1Ez49zUJsFS3USGn_DtquitLWBqCKPGvEZsur7XcM6RFeSDzuoM4P1jw1NjUs7hKRDij0WwzPbGPNGmIXPDTdB7CUVLiXdi2D8cZ6Cr9gTgchvvD0C6wn1qlyhvEl5tz5ySthJ0LzTvpOajAIH4Kq7VWvGuslmvFa72rrclHgDFoEhTdpFQbGFsg6lZFanp-VIVd8mzOqADP3jMv9OWGrk4uIJE_PoER1kkaXoVJ6rTPPAYvWQVHcTtthtrizFCYlwGDbHZnnVs',
    link: '#',
    category: 'Backend'
  },
  {
    id: '3',
    title: 'Prism_Framework',
    description: 'A spatial web framework designed for architectural visualization and massive-scale interactive environments.',
    tags: ['Architecture', 'Three.js'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwnwzLtx1BJQnouXnIsiCSNzl2QdTEPvX3qJjIos7JD6uaHVHoj2tvzZNxyJ7X9dM5GKBP6osDQgEn-sNrMuPydT-CqZUo_OXyzA1sIa_HnDxlSGy4DwELBA6T6DP-Qq1cqKnAn5EESK1DV_xUM0W1YNWl47FlrhLWiaGKhDnjwn3n-DvGFR3yiTws00LMI-9yOVJGwl_Bs4NeVcE1NmZZo9qhbc7A2wf0r6VkRXPxfp-kNnIs5CX8BLyUzsI-WR3ddXOCHgT6Vl4',
    link: '#',
    category: 'Architecture'
  },
  {
    id: '4',
    title: 'Quantum_Vault',
    description: 'Secure, encrypted storage solution with biometric authentication and decentralized data sharding.',
    tags: ['Security', 'React'],
    image: 'https://picsum.photos/seed/security/800/600',
    link: '#',
    category: 'Security'
  }
];

export const SKILLS: Skill[] = [
  { name: 'React', icon: 'Code' },
  { name: 'Next.js', icon: 'Layers' },
  { name: 'TypeScript', icon: 'Terminal' },
  { name: 'Tailwind', icon: 'Palette' },
  { name: 'Node.js', icon: 'Cpu' },
  { name: 'Express', icon: 'Settings' },
  { name: 'MongoDB', icon: 'Database' },
  { name: 'PostgreSQL', icon: 'Database' },
  { name: 'Docker', icon: 'Layers' },
  { name: 'Git', icon: 'History' },
  { name: 'Linux', icon: 'Terminal' },
  { name: 'Framer Motion', icon: 'Zap' },
  { name: 'D3.js', icon: 'Monitor' },
  { name: 'Redux', icon: 'Settings' },
  { name: 'GraphQL', icon: 'Layers' },
];

export const REVIEWS = [
  {
    id: '1',
    name: 'Alex Rivera',
    role: 'CEO @ TechFlow',
    content: 'Kazi delivered a high-performance dashboard that exceeded our expectations. His attention to structural integrity is unmatched.',
    avatar: 'https://picsum.photos/seed/alex/100/100'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Product Manager @ Innovate',
    content: 'The Monolith API is a beast. We handled our peak traffic without a single hiccup. Highly recommended for complex backend work.',
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    id: '3',
    name: 'Marcus Thorne',
    role: 'Founder @ SpatialDesign',
    content: 'Brilliant execution on the Prism Framework. The architectural visualization is stunning and performant.',
    avatar: 'https://picsum.photos/seed/marcus/100/100'
  },
  {
    id: '4',
    name: 'Elena Rodriguez',
    role: 'CTO @ SecureNet',
    content: 'Quantum Vault is exactly what we needed. Secure, fast, and the Neobrutalist design makes it stand out.',
    avatar: 'https://picsum.photos/seed/elena/100/100'
  },
  {
    id: '5',
    name: 'David Kim',
    role: 'Lead Dev @ CloudScale',
    content: 'Working with Kazi was a breeze. He understands the balance between raw efficiency and user experience.',
    avatar: 'https://picsum.photos/seed/david/100/100'
  }
];

export const EDUCATION: Education[] = [
  {
    period: '2021 - Present',
    degree: 'B.Sc. in Computer Science',
    institution: 'BUET (Bangladesh University of Engineering and Technology)',
    description: 'Focusing on Algorithms, System Architecture, and Advanced Web Engineering.',
    active: true
  },
  {
    period: '2019 - 2021',
    degree: 'Higher Secondary Certificate',
    institution: 'Science Discipline',
    description: 'Excellence in Mathematics and Physics foundation.',
    active: false
  }
];
