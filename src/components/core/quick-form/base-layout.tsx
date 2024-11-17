import { Box, TextWrap } from "@/components/custom";
import { useId } from "react";
import { BaseInput } from "./base-input";
import { UseFormReturn } from "@/hooks/use-form";
import { cn } from "@/lib/utils";

export function BaseLayout<T>({ form, ...rest }: IBaseLayoutProps<T>) {
  const id = useId();
  const child_container_style = rest?.child_container?.style || {};
  return (
    <Box reset_ui className="flex flex-col gap-2">
      {!rest?.hide?.title && (
        <TextWrap className="text-md font-bold block">{rest.title}</TextWrap>
      )}
      {!rest?.hide?.description && (
        <TextWrap className="text-sm block">{rest.description}</TextWrap>
      )}
      <Box
        reset_ui
        style={{
          ...child_container_style,
          overflowY: rest.scrollable ? "auto" : "hidden",
        }}
        className={cn(
          rest?.child_container?.class_name,
          rest.type == "horizontal" ? "flex gap-2" : "flex-col gap-2"
        )}
      >
        {rest.children.map((child, index) => {
          if (child.core_type == "input") {
            return (
              <BaseInput<T> key={`${id}-${index}`} {...child} form={form} />
            );
          } else if (child.core_type == "layout") {
            return <BaseLayout key={`${id}-${index}`} {...child} form={form} />;
          } else {
            return null;
          }
        })}
      </Box>
    </Box>
  );
}

interface IBaseLayoutProps<T> extends FormBaseLayout {
  form: UseFormReturn<T>;
}
