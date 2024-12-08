import { use_form_global_state } from "@/states/form.state";
import { use_project_store } from "@/states/project.state";
import {} from "react";

export const use_menu = (props: Props) => {
  const element = props?.element;
  const { get_path_from_id } = use_project_store();
  const { open_form } = use_form_global_state();
  const open_edit_form = () => {
    if (!element) return;
    const path = get_path_from_id(element?.id);
    if (!path) return;
    open_form(
      element?.type,
      { name: element?.name, path: path, id: element?.id },
      {
        title: `Edit ${element?.type}`,
        description: `Edit ${element?.type}`,
      }
    );
  };
  const open_create_form = (
    el_type: FileAndFoldersType["type"],
    el_path?: Path
  ) => {
    const path =
      typeof el_path == "string"
        ? el_path
        : element
        ? get_path_from_id(element?.id)
        : undefined;
    if (typeof path !== "string") return;
    open_form(
      el_type,
      {
        name: "Untitled",
        path,
      },
      { title: `Create ${el_type}`, description: `Create a new ${el_type}` }
    );
  };
  return {
    open_edit_form,
    open_create_form,
  };
};

interface Props {
  element?: FileAndFoldersType;
}
