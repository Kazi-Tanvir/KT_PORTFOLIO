import { HeroGrid } from "@/components/sections/HeroGrid";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ReviewSlider } from "@/components/sections/ReviewSlider";
import { MilestonesSection } from "@/components/sections/MilestonesSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getProjects, getSkills, getReviews, getEducation } from "@/app/actions";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let projects = [];
  let skills = [];
  let reviews = [];
  let education = [];

  try {
    [projects, skills, reviews, education] = await Promise.all([
      getProjects(),
      getSkills(),
      getReviews(),
      getEducation(),
    ]);
  } catch (error) {
    console.error("Database fetch failed:", error);
  }

  return (
    <>
      <HeroGrid skills={skills} />
      <ProjectsSection projects={projects} />
      <ReviewSlider reviews={reviews} />
      <MilestonesSection education={education} />
      <ContactCTA />
    </>
  );
}
