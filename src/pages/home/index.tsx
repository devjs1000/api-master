import { Projects } from "@/components/core/projects";
import { Container } from "@/components/custom";

export const Home = (_props: IHomeProps) => {
  return (
    <Container className="w-full">
      
      <Projects />
    </Container>
  );
};

interface IHomeProps {}
