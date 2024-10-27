import { class_config } from "@/configs/class.config";
import { cn } from "@/lib/utils";
import {} from "react";

export const Container = ({
  className,
  all_center,
  children,
  ...rest
}: IContainerProps) => {
  return (
    <div
      {...rest}
      className={cn("p-4", all_center && class_config.all_center, className)}
    >
      {children}
    </div>
  );
};

interface IContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  all_center?: boolean;
}
