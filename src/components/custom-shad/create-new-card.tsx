import { CSSProperties, forwardRef } from "react";
import { Card } from "@/components/ui/card";
import { LucidePlus } from "lucide-react";
import { CustomTooltip } from "./custom-tooltip";
import { cn } from "@/lib/utils";

export const CreateNewCard = forwardRef(({
  tooltip,
  w,
  h,
  on_click,
  className,
  ...rest
}: ICreateNewCardProps, ref:any) => {
  return (
    <CustomTooltip content={tooltip || "Create New"}>
      <Card
        style={{
          width: w,
          height: h,
        }}
        className={cn(
          "flex items-center justify-center hover:bg-zinc-100 cursor-pointer",
          className
        )}
        onClick={on_click}
        {...rest}
        ref={ref}
      >
        <LucidePlus />
      </Card>
    </CustomTooltip>
  );
});

interface ICreateNewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  w: CSSProperties["width"];
  h: CSSProperties["height"];
  tooltip?: string;
  on_click?: () => void;
}
