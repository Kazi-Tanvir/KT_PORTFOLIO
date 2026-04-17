import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { getProjects } from "@/app/actions";

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  let projects = [];

  try {
    projects = await getProjects();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }

  return (
    <div className="pt-12">
      <ProjectsSection showAll={true} projects={projects} />
    </div>
  );
}
