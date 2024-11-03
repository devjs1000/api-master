import { cn } from "@/lib/utils";

export const Code = ({
  className,
  children,
  reset_ui,
  ...rest
}: ICodeProps) => {
  return (
    <code
      {...rest}
      className={cn(reset_ui ? "" : "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", className)}
    >
      {children}
    </code>
  );
};

interface ICodeProps extends React.HTMLAttributes<HTMLDivElement> {
  reset_ui?: boolean;
}
