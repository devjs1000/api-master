import { Box, Container } from "@/components/custom";
import { Code } from "@/components/custom/code";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CorruptURL = (props: ICorruptURLProps) => {
  const { url, missing_params } = props;
  const navigate = useNavigate();
  return (
    <Container className="h-screen" all_center={true}>
      <Box w={"50%"}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Corrupt URL</AlertTitle>
          <AlertDescription>
            The URL <Code>{url}</Code> is missing the following parameters:{" "}
            <Code>{missing_params.join(", ")}</Code>.
          </AlertDescription>
        </Alert>
        <Box className="mt-4 flex gap-2" reset_ui>
          <Button onClick={() => navigate(-1)} variant={"default"}>
            <ArrowLeft />
            Go Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

interface ICorruptURLProps {
  url: string;
  missing_params: string[];
}
