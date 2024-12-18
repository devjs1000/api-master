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
  update_element_by_path,
  remove_element_by_path,
  get_path_from_id,
  get_element_by_path,
  move_element_to_path,
} from "@/utils/project.utils";
import _ from "lodash";
import { create } from "zustand";

const current_project = local_get_current_project();
const inital_project_state: ProjectStoreGet = {
  projects: local_projects_without_children(),
  current_project: current_project,
  current_project_id: current_project?.id || null,
  selected_element: null,
};

export const use_project_store = create<ProjectStore>((set, get) => {
  return {
    ...inital_project_state,
    add_project: (project) => {
      local_add_project(project);
      set({ projects: local_projects_without_children() });
      get().sync_selected_element();
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
      get().sync_selected_element();
    },
    add_folder: (params) => {
      const current_project = get().current_project;
      const current_project_children = current_project?.children;
      if (!current_project_children) return;
      const folder = create_folder(params);
      const cloned_children = _.cloneDeepWith(current_project_children);
      const updated_children = add_element_by_path(
        cloned_children,
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
        get().sync_selected_element();
      }
    },
    add_file: (params) => {
      const current_project = get().current_project;
      const current_project_children = current_project?.children;
      if (!current_project_children) return;
      const file = create_file(params);
      const cloned_children = _.cloneDeepWith(current_project_children);
      const updated_children = add_element_by_path(
        cloned_children,
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
        get().sync_selected_element();
      }
    },
    update_folder: ({ path, ...params }) => {
      const current_project = get().current_project;
      const current_project_children = current_project?.children;
      if (!current_project_children) return;
      const cloned_children = _.cloneDeepWith(current_project_children);
      const updated_children = update_element_by_path(
        cloned_children,
        (element) => {
          return {
            ...element,
            ...params,
          };
        },
        path
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
        get().sync_selected_element();
      }
    },
    update_file: ({ path, ...params }) => {
      const current_project = get().current_project;
      const current_project_children = current_project?.children;
      if (!current_project_children) return;
      const cloned_children = _.cloneDeepWith(current_project_children);
      const updated_children = update_element_by_path(
        cloned_children,
        (element) => {
          return {
            ...element,
            ...params,
          };
        },
        path
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
        get().sync_selected_element()
      }
    },
    sync_selected_element: () => {
      const selected_element = get().selected_element;
      if (!selected_element) return;
      const current_project = get().current_project;
      const current_project_children = current_project?.children;
      if (!current_project_children) return;
      const cloned_children = _.cloneDeepWith(current_project_children);
      const path = selected_element.path;
      const element = get_element_by_path(cloned_children, path);
      if (!element) {
        set({ selected_element: null });
      } else {
        set({
          selected_element: {
            path,
            ...element,
          },
        });
      }
    },
    remove_element: (path) => {
      const current_project = get().current_project;
      const current_project_children = current_project?.children;
      if (!current_project_children) return;
      const cloned_children = _.cloneDeepWith(current_project_children);
      const updated_children = remove_element_by_path(cloned_children, path);
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
        get().sync_selected_element();
      }
    },
    remove_element_by_id: (id) => {
      const current_project = get().current_project;
      const current_project_children = current_project?.children;
      if (!current_project_children) return;
      const cloned_children = _.cloneDeepWith(current_project_children);
      const path = get_path_from_id(cloned_children, id);
      if (!path) return;
      get().remove_element(path);
    },
    select_element: (id) => {
      const current_project = get().current_project;
      const current_project_children = current_project?.children;
      if (!current_project_children) return;
      const cloned_children = _.cloneDeepWith(current_project_children);
      const path = get_path_from_id(cloned_children, id);
      if (!path) return;
      const element = get_element_by_path(cloned_children, path);
      if (!element) return;
      set({
        selected_element: {
          path,
          ...element,
        },
      });
    },
    move_element_by_path(from, to) {
      const current_project = get().current_project;
      const current_project_children = current_project?.children;
      if (!current_project_children) return;
      const cloned_children = _.cloneDeepWith(current_project_children);
      const updated_children = move_element_to_path(cloned_children, from, to);
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
    move_element_by_id(from, to) {
      const current_project = get().current_project;
      const current_project_children = current_project?.children;
      if (!current_project_children) return "no children";
      const cloned_children = _.cloneDeepWith(current_project_children);
      const from_path = get_path_from_id(cloned_children, from);
      if (!from_path) return "from path not found";
      const to_path = get_path_from_id(cloned_children, to);
      if (!from_path || !to_path) return "path not found";
      get().move_element_by_path(from_path, to_path);
    },
    get_path_from_id: (id) => {
      const current_project = get().current_project;
      const current_project_children = current_project?.children;
      if (!current_project_children) return null;
      return get_path_from_id(current_project_children, id) || null;
    },
    get_element_by_id: (id) => {
      const current_project = get().current_project;
      const current_project_children = current_project?.children;
      if (!current_project_children) return null;
      const path = get_path_from_id(current_project_children, id);
      if (!path) return null;
      return get_element_by_path(current_project_children, path) || null;
    },
  };
});
