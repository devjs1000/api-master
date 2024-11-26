import { Box } from "../layouts/box";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectInput = (props: ISelectInputProps) => {
  return (
    <Box reset_ui>
      <Select
        onValueChange={(value) => props.onChange?.(value)}
        value={props.value}
      >
        <SelectTrigger className="w-full" id={props.id}>
          <SelectValue placeholder={props?.placeholder || "Select"} />
        </SelectTrigger>
        <SelectContent>
          {props?.data?.map?.((item, index) => (
            <SelectItem
              key={index}
              value={item.value}
              className="text-sm text-zinc-600"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Box>
  );
};

interface ISelectInputProps {
  id: FormBaseInput["id"];
  default_value?: FormBaseInput["default_value"];
  value: string;
  onChange?: (value: string) => void;
  placeholder?: FormBaseInput["placeholder"];
  data: Mappables;
}
