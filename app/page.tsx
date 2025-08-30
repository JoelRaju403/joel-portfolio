import { AboutPage } from "@/components/AboutSection";
import { HeroSection } from "@/components/herosection";
import { ProjectsSection } from "@/components/ProjectSection";
import { SkillsSection } from "@/components/SkillsSection";
const Page = () => {
  return (
    <main>
      <HeroSection />
      <AboutPage />
      <ProjectsSection />
      <SkillsSection />
    </main>
  );
};
export default Page;
