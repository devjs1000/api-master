import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

export const Box = ({
  className,
  w,
  h,
  children,
  reset_ui,
  ...rest
}: IBoxProps) => {
  return (
    <div
      {...rest}
      className={cn(reset_ui ? "" : "p-4", className)}
      style={{ width: w, height: h }}
    >
      {children}
    </div>
  );
};

interface IBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  w?: CSSProperties["width"];
  h?: CSSProperties["height"];
  reset_ui?: boolean;
}
