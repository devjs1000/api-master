import {
  local_add_project,
  local_projects_without_children,
  local_get_project,
  local_update_project,
  local_remove_project,
} from "@/utils/project.utils";
import { create } from "zustand";

const inital_project_state: ProjectStoreGet = {
  projects: local_projects_without_children(),
  current_project: null,
  current_project_id: null,
};

export const use_project_store = create<ProjectStore>((set) => {
  return {
    ...inital_project_state,
    add_project: (project) => {
      local_add_project(project);
      set({ projects: local_projects_without_children() });
    },
    open_project: (id) => {
      const project = local_get_project(id);
      set({ current_project: project, current_project_id: id });
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
  };
});
