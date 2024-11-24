import { class_config } from "@/configs/class.config";
import { cn } from "@/lib/utils";
import {} from "react";

export const Container = ({
  className,
  all_center,
  children,
  reset_ui = false,
  full_screen = false,
  full_size = false,
  ...rest
}: IContainerProps) => {
  return (
    <div
      {...rest}
      className={cn(
        reset_ui ? "" : "p-4",
        all_center && class_config.all_center,
        full_screen && class_config.full_screen,
        full_size && class_config.full_size,
        className
      )}
    >
      {children}
    </div>
  );
};

interface IContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  all_center?: boolean;
  full_screen?: boolean;
  full_size?: boolean;
  reset_ui?: boolean;
}
