import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DisclosureReturnType } from "@/hooks/use-disclosure";

export const CustomModal = (props: CustomModalProps) => {
  return (
    <Dialog
      open={props?.disclosure?.open}
      onOpenChange={(open) => {
        props?.disclosure?.set_open(open);
      }}
    >
      <DialogTrigger asChild>
        {typeof props.trigger === "string" ? (
          <Button variant="outline">{props?.trigger}</Button>
        ) : (
          props.trigger
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {(props?.title || props?.description) && (
          <DialogHeader>
            {props?.title && <DialogTitle>{props?.title}</DialogTitle>}
            {props?.description && (
              <DialogDescription>{props?.description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {props.children}
        {!!props?.footer_buttons?.length && (
          <DialogFooter>
            {props?.footer_buttons?.map?.((button, index) => (
              <Button
                key={index}
                onClick={button.on_click}
                variant={button.variant || "default"}
              >
                {button.left_icon || ""}
                {button.title || "Button"}
                {button.right_icon || ""}
              </Button>
            ))}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

interface FooterButton {
  title: string;
  on_click: () => void;
  left_icon?: React.ReactNode;
  right_icon?: React.ReactNode;
  variant?: ButtonProps["variant"];
}

interface CustomModalProps {
  footer_buttons?: FooterButton[];
  title: string;
  description?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  disclosure?: DisclosureReturnType;
}
