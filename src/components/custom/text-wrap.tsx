import { cn } from "@/lib/utils";
import {} from "react";

export const TextWrap = ({ className, children, ...rest }: ITextWrapProps) => {
  return (
    <span {...rest} className={cn(className)}>
      {children}
    </span>
  );
};

interface ITextWrapProps extends React.HTMLAttributes<HTMLSpanElement> {}
