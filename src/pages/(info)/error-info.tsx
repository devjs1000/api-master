import { useNavigate, useRouteError } from "react-router-dom";
import { AlertCircle, ArrowLeft, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Box, Container } from "@/components/custom";
import { Button } from "@/components/ui/button";

export const ErrorInfo = (_props: IErrorInfoProps) => {
  const error: any = useRouteError();
  const error_name = error?.name || error?.error?.name;
  const error_message = error?.message || error?.error?.message;
  const navigate = useNavigate();
  return (
    <Container className="h-screen" all_center={true}>
      <Box w={"50%"}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{error_name}</AlertTitle>
          <AlertDescription>{error_message}</AlertDescription>
        </Alert>
        <Box className="mt-4 flex gap-2" reset_ui>
          <Button onClick={() => navigate(-1)} variant={"default"}>
            <ArrowLeft /> 
            Go Back
          </Button>
          <Button onClick={window.location.reload} variant={"destructive"}>
            <RefreshCcw />
            Reload
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

interface IErrorInfoProps {}
