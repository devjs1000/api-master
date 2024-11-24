import { Box, Container } from "@/components/custom";
import { Code } from "@/components/custom/code";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const NotSelected = () => {
  return (
    <Container className="h-screen" all_center={true}>
      <Box w={"50%"}>
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Element Selected</AlertTitle>
          <AlertDescription>
           
            Please select an <Code>element</Code> from the <Code>sidebar</Code> to view its details.
            
          </AlertDescription>
        </Alert>
      </Box>
    </Container>
  );
};

export default NotSelected;