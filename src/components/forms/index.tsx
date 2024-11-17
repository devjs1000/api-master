import { use_form_global_state } from "@/state/form.state";
import {} from "react";
import { CustomModal } from "../custom-shad/custom-modal";
import ProjectForm from "./project.form";
import FolderForm from "./folder.form";
import FileForm from "./file.form";

const Forms = (_props: IFormsProps) => {
  const { form_name, modal_input, close_form } = use_form_global_state();
  return (
    form_name && (
      <CustomModal
        title={modal_input?.title || ""}
        description={modal_input?.description}
        disclosure={{
          open: !!form_name,
          on_close: close_form,
        }}
      >
        {form_name == "project" && <ProjectForm />}
        {form_name == "folder" && <FolderForm />}
        {form_name == "file" && <FileForm />}
      </CustomModal>
    )
  );
};

export default Forms;

interface IFormsProps {}
