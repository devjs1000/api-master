import { class_config } from "@/configs/class.config";
import { cn } from "@/lib/utils";
import {} from "react";

export const TextWrap = ({
  className,
  children,
  ellipsis = false,
  type="p2",
  style={},
  ...rest
}: ITextWrapProps) => {
  return (
    <span
      {...rest}
      className={cn(className, ellipsis && class_config.ellipsis, class_config[type])}
      style={{
        fontFamily: '"Inter", sans-serif',
        ...style,
      }}
    >
      {children}
    </span>
  );
};

export interface ITextWrapProps extends React.HTMLAttributes<HTMLSpanElement> {
  ellipsis?: boolean;
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "p1" | "p2" | "p3" | "p4";
}
