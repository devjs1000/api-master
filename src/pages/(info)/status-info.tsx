import { Box, Container } from "@/components/custom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export const StatusInfo = (props: IStatusInfoProps) => {
  return (
    <Container className={cn("h-screen", props?.className)} all_center={true}>
      <Box w={"50%"}>
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{props?.title}</AlertTitle>
          <AlertDescription>{props?.children}</AlertDescription>
        </Alert>
      </Box>
    </Container>
  );
};

interface IStatusInfoProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}
