import { useState } from "react";
import { Box } from "./box";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { TextWrap } from "./text-wrap";
import { XIcon } from "lucide-react";

export const TagInput = (props: ITagInputProps) => {
  const [input, setInput] = useState("");
  const handle_input_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handle_tag_remove = (index: number) => {
    props?.onChange?.(props?.value?.filter((_, i) => i !== index));
  };
  const handle_key_down = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const existing_tag_index = props?.value?.findIndex((tag) => tag === input);
      if (existing_tag_index !== -1) {
        props?.onChange?.([...props?.value?.filter((_, i) => i !== existing_tag_index), input]);
        setInput("");
        return;
      }
      props?.onChange?.([...props?.value, input]);
      setInput("");
    }
  };
  return (
    <Box reset_ui>
      <Input
        type="text"
        id={props.id}
        value={input}
        onChange={handle_input_change}
        onKeyDown={handle_key_down}
        placeholder={props.placeholder}
      />
      <Box reset_ui className="flex flex-wrap gap-1 mt-4">
        {props.value.map((tag, index) => (
          <Badge
            key={index}
            variant={"secondary"}
            defaultChecked
            className="group"
          >
            <TextWrap className="group-hover:text-zinc-600">{tag}</TextWrap>
            <XIcon
              className="text-red-500 group-hover:text-red-500 cursor-pointer"
              size={16}
              onClick={() => handle_tag_remove(index)}
            />
          </Badge>
        ))}
      </Box>
    </Box>
  );
};

interface ITagInputProps {
  id: FormBaseInput["id"];
  default_value?: FormBaseInput["default_value"];
  value: string[];
  onChange?: (value: string[]) => void;
  placeholder?: FormBaseInput["placeholder"];
}
