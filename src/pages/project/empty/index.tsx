import { Code, Container } from "@/components/custom";
import { StatusInfo } from "@/pages/(info)/status-info";
import {} from "react";
export const ProjectEmpty: React.FC = () => {
  return (
    <Container>
      <StatusInfo title="No Element Selected">
        Please select an <Code>element</Code> from the <Code>sidebar</Code> to
        view its details.
      </StatusInfo>
    </Container>
  );
};
