import { Box } from "@/components/custom";
import { CustomDropdown } from "@/components/custom-shad";
import { MenuIcon, SaveIcon } from "lucide-react";
import {} from "react";

export const EndNav = (_props: IEndNavProps) => {
  return (
    <Box reset_ui className="flex justify-end">
      <CustomDropdown
        items={[
          {
            name: 'save',
            label: 'Save',
            Icon: SaveIcon,
            on_click: () => {},
          }
        ]}
        menu={{
          label: "Menu",
        }}
      >
        <MenuIcon size={24}  />
      </CustomDropdown>
    </Box>
  );
};

interface IEndNavProps {}
