import {} from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { TextWrap } from "../custom/typography/text-wrap";

export const CustomTooltip = (props: ICustomTooltipProps) => {
  if (props.disabled) return props.children;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{props.children}</TooltipTrigger>
        <TooltipContent>
          <TextWrap>{props.content}</TextWrap>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface ICustomTooltipProps {
  disabled?: boolean;
  children?: React.ReactNode;
  content?: React.ReactNode;
}
