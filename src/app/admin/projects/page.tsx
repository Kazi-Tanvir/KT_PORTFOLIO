import { getProjects } from "@/app/actions";
import ProjectsAdminClient from "./ProjectsAdminClient";

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  let projects = [];
  try {
    projects = await getProjects();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }

  return <ProjectsAdminClient projects={projects} />;
}
