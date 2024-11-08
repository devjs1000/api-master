import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ITextWrapProps, TextWrap } from "../custom/text-wrap";

export const CustomDropdown = (props: ICustomDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          {props?.children}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!props.menu?.hide && (
          <>
            <DropdownMenuLabel>{props.menu.label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {props?.items?.map((item, index) => {
          const is_react_node = React.isValidElement(item);
          if (is_react_node) {
            return (
              <DropdownMenuItem key={index}>
                {item}
              </DropdownMenuItem>
            );
          }
          if(typeof item === "string") {
            return <DropdownElement key={index} type={item as DropdownElementType} />;
          }
          const {
            name,
            label,
            Icon,
            on_click,
            label_props = {},
            hide,
          } = item as DropdownItem;
          if (hide) return null;
          return (
            <DropdownMenuItem
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                on_click();
              }}
            >
              <Icon />
              <TextWrap id={name} {...label_props}>
                {label}
              </TextWrap>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ICustomDropdownProps {
  items: (DropdownItem | React.ReactNode & DropdownElementType)[];
  menu: {
    label: string;
    hide?: boolean;
  };
  children: React.ReactNode;
}

interface DropdownItem {
  name: string;
  label: string;
  label_props?: ITextWrapProps;
  hide?: boolean;
  Icon: React.FC;
  on_click: () => void;
}

type DropdownElementType = "separator" | "br";
const DropdownElement: React.FC<{ type: DropdownElementType }> = ({ type }) => {
  switch (type) {
    case "br":
      return <br />;
    case "separator":
      return <DropdownMenuSeparator />;
    default:
      return null;
  }
};
