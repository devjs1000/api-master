import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../../ui/textarea";
import { Container } from "@/components/custom";
import { cn } from "@/lib/utils";
import { TagInput } from "@/components/custom/tag-input";
import { Button } from "@/components/ui/button";
import { SelectInput } from "@/components/custom/select-input";

export const InputController: React.FC<IInputControllerProps> = (props) => {
  return (
    <Container
      reset_ui
      className={cn(
        "grid w-full max-w-sm items-center gap-1.5 mt-4",
        props?.container?.class_name
      )}
    >
      {props?.label && <Label htmlFor={props.id}>{props.label}</Label>}
      {props?.type === "text" && (
        <Input
          type="text"
          id={props?.id}
          placeholder={props?.placeholder}
          value={props?.value}
          onChange={(e) => props?.onChange?.(e.target.value)}
        />
      )}
      {props?.type === "textarea" && (
        <Textarea
          id={props?.id}
          placeholder={props?.placeholder}
          value={props?.value}
          onChange={(e) => props?.onChange?.(e.target.value)}
        />
      )}
      {props?.type === "tag" && (
        <TagInput
          id={props?.id}
          default_value={props?.default_value || []}
          placeholder={props?.placeholder}
          value={props?.value || []}
          onChange={props?.onChange}
        />
      )}
      {props?.type === "button" && (
        <Button
          {...props?.props}
          variant={props?.props?.variant || "default"}
          onClick={props?.props?.onClick}
        >
          {props?.children}
        </Button>
      )}
      {props?.type === "select" && (
        <SelectInput
          id={props?.id}
          default_value={props?.default_value || []}
          placeholder={props?.placeholder}
          value={props?.value || []}
          onChange={props?.onChange}
          data={props?.props?.data || []}
        />
      )}
    </Container>
  );
};

interface IInputControllerProps extends FormBaseInput {
  value?: any;
  onChange?: (value: any) => void;
}
