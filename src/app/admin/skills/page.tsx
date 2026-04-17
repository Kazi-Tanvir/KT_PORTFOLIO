import { getSkills } from "@/app/actions";
import SkillsAdminClient from "./SkillsAdminClient";

export const dynamic = 'force-dynamic';

export default async function AdminSkillsPage() {
  let skills = [];
  try {
    skills = await getSkills();
  } catch (error) {
    console.error("Failed to fetch skills:", error);
  }

  return <SkillsAdminClient skills={skills} />;
}
