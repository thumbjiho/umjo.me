import ProjectGrid from "../components/ProjectGrid";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <>
      <h1 className="font-serif text-[1.75rem] font-bold mb-8">프로젝트</h1>
      <ProjectGrid projects={projects} />
    </>
  );
}
