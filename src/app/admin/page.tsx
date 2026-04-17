import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { adminLogout, getDashboardCounts } from "@/app/actions";
import { FolderOpen, Cpu, GraduationCap, Star, Mail, ArrowRight, LogOut } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

const sections = [
  {
    key: 'projects',
    label: 'Projects',
    icon: FolderOpen,
    href: '/admin/projects',
    color: 'bg-hero-bg',
    description: 'Manage your portfolio deployments',
  },
  {
    key: 'skills',
    label: 'Skills',
    icon: Cpu,
    href: '/admin/skills',
    color: 'bg-primary-container',
    description: 'Update your tech arsenal',
  },
  {
    key: 'education',
    label: 'Education',
    icon: GraduationCap,
    href: '/admin/education',
    color: 'bg-about-bg',
    description: 'Edit milestones & qualifications',
  },
  {
    key: 'reviews',
    label: 'Reviews',
    icon: Star,
    href: '/admin/reviews',
    color: 'bg-milestone-bg',
    description: 'Manage client testimonials',
  },
  {
    key: 'messages',
    label: 'Messages',
    icon: Mail,
    href: '/admin/messages',
    color: 'bg-primary',
    description: 'View incoming communications',
  },
];

export default async function AdminDashboard() {
  let counts: Record<string, number> = {
    projects: 0, skills: 0, education: 0, reviews: 0, messages: 0,
  };

  try {
    counts = await getDashboardCounts();
  } catch (error) {
    console.error("Failed to fetch counts:", error);
  }

  return (
    <div className="py-8 md:py-12 space-y-8 md:space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 border-b-[4px] md:border-b-[8px] border-black pb-6 md:pb-8">
        <div className="space-y-1 md:space-y-2">
          <h1 className="font-headline text-2xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter">Command_Center</h1>
          <p className="font-body text-sm md:text-xl font-bold text-on-surface-variant">
            Portfolio Control Panel — Manage Everything
          </p>
        </div>
        
        <form action={adminLogout}>
          <Button variant="outline" className="text-sm md:text-xl flex items-center gap-2">
            <LogOut size={18} /> <span className="hidden md:inline">TERMINATE_SESSION</span><span className="md:hidden">LOGOUT</span>
          </Button>
        </form>
      </div>

      {/* Section Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {sections.map((section) => {
          const Icon = section.icon;
          const count = counts[section.key] ?? 0;
          return (
            <Card key={section.key} className="p-0 overflow-hidden group hover:-translate-y-2 transition-transform duration-300" bg="bg-white">
              {/* Color header bar */}
              <div className={`${section.color} px-4 md:px-8 py-4 md:py-6 border-b-[3px] md:border-b-[5px] border-black`}>
                <div className="flex items-center justify-between">
                  <Icon size={28} className="text-black md:hidden" />
                  <Icon size={40} className="text-black hidden md:block" />
                  <span className="font-headline text-3xl md:text-5xl font-black">{count}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-8 space-y-3 md:space-y-4">
                <h2 className="font-headline text-xl md:text-3xl font-black uppercase tracking-tight">{section.label}</h2>
                <p className="font-body font-bold text-on-surface-variant text-sm md:text-base">{section.description}</p>
                
                <Link href={section.href}>
                  <Button variant="primary" className="w-full mt-4 flex items-center justify-center gap-2 text-base md:text-lg">
                    MANAGE <ArrowRight size={18} />
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
