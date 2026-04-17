import { getEducation } from "@/app/actions";
import EducationAdminClient from "./EducationAdminClient";

export const dynamic = 'force-dynamic';

export default async function AdminEducationPage() {
  let education = [];
  try {
    education = await getEducation();
  } catch (error) {
    console.error("Failed to fetch education:", error);
  }

  return <EducationAdminClient education={education} />;
}
