import {
  local_add_project,
  local_projects_without_children,
  local_get_project,
  local_update_project,
  local_remove_project,
  add_element_by_path,
  create_folder,
  local_set_current_project_id,
  local_get_current_project,
  create_file,
} from "@/utils/project.utils";
import { create } from "zustand";

const inital_project_state: ProjectStoreGet = {
  projects: local_projects_without_children(),
  current_project: local_get_current_project(),
  current_project_id: null,
};

export const use_project_store = create<ProjectStore>((set, get) => {
  return {
    ...inital_project_state,
    add_project: (project) => {
      local_add_project(project);
      set({ projects: local_projects_without_children() });
    },
    open_project: (id) => {
      const project = local_get_project(id);
      set({ current_project: project, current_project_id: id });
      local_set_current_project_id(id);
      return id;
    },
    update_project: (id, project) => {
      local_update_project(id, project);
      set({
        projects: local_projects_without_children(),
      });
    },
    remove_project: (id) => {
      local_remove_project(id);
      set({
        projects: local_projects_without_children(),
      });
    },
    add_folder: (params) => {
      console.log(params);
      const current_project = get().current_project;
      const current_project_children = current_project?.children;
      if (!current_project_children) return;
      const folder = create_folder(params);
      const updated_children = add_element_by_path(
        current_project_children,
        folder,
        params.path
      );
      if (updated_children) {
        const updated_project = {
          ...current_project,
          children: updated_children,
        };
        set({
          current_project: {
            ...updated_project,
            children: updated_children,
          },
        });
        local_update_project(current_project.id, updated_project);
      }
    },
    add_file: (params) => {
      const current_project = get().current_project;
      const current_project_children = current_project?.children;
      if (!current_project_children) return;
      const file = create_file(params);
      const updated_children = add_element_by_path(
        current_project_children,
        file,
        params.path
      );
      if (updated_children) {
        const updated_project = {
          ...current_project,
          children: updated_children,
        };
        set({
          current_project: {
            ...updated_project,
            children: updated_children,
          },
        });
        local_update_project(current_project.id, updated_project);
      }
    },
    // add_file: ({ name, path }) => {},
    // remove_file: (path) => {},
    // remove_folder: (path) => {},
  };
});
