import { Box, SelectInput } from "@/components/custom";
import { lists } from "@/configs/lists.config";
import { create_mappable } from "@/utils/mappable.utils";
import {} from "react";

export const ApiRequestMaker: React.FC<Props> = (props) => {
  return (
    <Box>
      <Box reset_ui className="flex flex-row">
        <SelectInput
          id={"method"}
          data={create_mappable(lists.api.methods)}
          {...props.form.register("method")}
        />
      </Box>
    </Box>
  );
};

interface Props {
  form: FormHookReturnType<Partial<ApiFile>>;
}
