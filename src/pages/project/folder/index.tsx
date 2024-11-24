import { Box, Container } from "@/components/custom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Folder = () => {

return (
    <Container className="h-screen" all_center={true}>
    <Box w={"50%"}>
      <Alert variant="default">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Folder Selected </AlertTitle>
        <AlertDescription>
          Folder is selected from the sidebar.
        </AlertDescription>
      </Alert>
    </Box>
  </Container>
)
};

export default Folder;