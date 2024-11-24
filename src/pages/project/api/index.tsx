import { Box, Container } from "@/components/custom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Api = () => {
  return (
    <Container className="h-screen" all_center={true}>
      <Box w={"50%"}>
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Api Selected </AlertTitle>
          <AlertDescription>
            Api is selected from the sidebar.
          </AlertDescription>
        </Alert>
      </Box>
    </Container>
  );
};

export default Api;
