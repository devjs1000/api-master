import { Container } from "@/components/custom";
import { use_project_store } from "@/state/project.state";
import {} from "react";
import ProjectNav from "./nav";

const Project = (_props: IProjectProps) => {
  const {} = use_project_store();
  return (
    <Container reset_ui className="w-full">
      <ProjectNav />
    </Container>
  );
};

export default Project;

interface IProjectProps {}
