import shortid from "shortid";

const projects_key = "projects";

export const local_stored_projects = () => localStorage.getItem(projects_key);

export const local_projects = () => {
  const projects_stored = local_stored_projects();
  return projects_stored ? JSON.parse(projects_stored) : [];
};
export const local_get_project = (id: string) => {
  return local_projects().find((project: Project) => project.id === id) || null;
};
export const local_add_project = (project: ProjectAdd) => {
  const projects_list = local_projects();
  const id = shortid.generate();
  projects_list.unshift({
    ...project,
    id,
    created_at: new Date(),
    updated_at: new Date(),
    children: [],
  });
  localStorage.setItem(projects_key, JSON.stringify(projects_list));
};
export const local_update_project = (id: string, project: Partial<Project>) => {
  const projects_list = local_projects();
  const project_index = projects_list.findIndex(
    (project: Project) => project.id === id
  );
  projects_list[project_index] = {
    ...projects_list[project_index],
    ...project,
    updated_at: new Date(),
  };
  localStorage.setItem(projects_key, JSON.stringify(projects_list));
};
export const local_remove_project = (id: string) => {
  const projects_list = local_projects();
  const project_index = projects_list.findIndex(
    (project: Project) => project.id === id
  );
  projects_list.splice(project_index, 1);
  localStorage.setItem(projects_key, JSON.stringify(projects_list));
};
export const local_projects_without_children = () => {
  return local_projects().map((project: Project) => {
    return {
      ...project,
      children: null,
    };
  });
};
export const local_set_current_project_id = (id: string) => {
  localStorage.setItem("current_project_id", id);
};
export const local_get_current_project_id = () => {
  return localStorage.getItem("current_project_id") || null;
};
export const local_get_current_project = () => {
  const id = local_get_current_project_id();
  return id ? local_get_project(id) : null;
};

export const generate_hierarchy_id = (paths: number[]): Path => {
  return paths.join(".") as Path;
};

export const read_hierarchy_paths = (id: string): number[] => {
  if (id === "") return [];
  return id.split(".").map((path) => parseInt(path));
};

export const get_hierarchy_level = (id: string): number => {
  if (id === "") return 0;
  return id.split(".").length;
};

export const get_hierarchy_id_by_level = (level: number): Path => {
  const paths = Array.from({ length: level }, (_, index) => index);
  return generate_hierarchy_id(paths);
};

export const update_hierarchy_id_by_index = (
  id: string,
  index: number
): Path => {
  const paths = read_hierarchy_paths(id);
  paths[paths.length - 1] = index;
  return generate_hierarchy_id(paths);
};

export const get_element_by_path = (
  elements: FileAndFoldersType | FileAndFoldersType[],
  path: Path,
  level: number = 0
): FileAndFoldersType | null => {
  const is_array = Array.isArray(elements);
  const level_id = get_hierarchy_id_by_level(level);
  if (!is_array) {
    if (level_id === path) return elements;
  } else {
    for (let i = 0; i < elements.length; i++) {
      const element_id = update_hierarchy_id_by_index(path, i);
      const element = elements[i];
      if (element_id === path) return element;
      if (element.type == "folder") {
        const children = element.children;
        if (children.length) {
          const child: FileAndFoldersType | null = get_element_by_path(
            children,
            path,
            level + 1
          );
          if (child) return child;
        }
      }
    }
  }
  return null;
};

export const update_element_by_path = (
  elements: FileAndFoldersType | FileAndFoldersType[],
  updater: (element: FileAndFoldersType) => FileAndFoldersType,
  path: Path,
  level: number = 0
): FileAndFoldersType[] | null => {
  const is_array = Array.isArray(elements);
  const level_id = get_hierarchy_id_by_level(level);
  if (!is_array) {
    if (level_id === path) {
      updater(elements);
      //@ts-ignore
      return elements;
    }
  } else {
    for (let i = 0; i < elements.length; i++) {
      const element_id = update_hierarchy_id_by_index(path, i);
      const element = elements[i];
      if (element_id === path) {
        updater(element);
        return elements;
      }
      if (element.type == "folder" && element.children.length) {
        const children = element.children;
        const updated_children = update_element_by_path(
          children,
          updater,
          path,
          level + 1
        );
        if (updated_children) {
          elements[i] = {
            ...element,
            //@ts-ignore
            children: updated_children,
          };
          return elements;
        }
      }
    }
  }
  return null;
};

export const remove_element_by_path = (
  elements: FileAndFoldersType | FileAndFoldersType[],
  path: Path,
  level: number = 0
): FileAndFoldersType[] | null => {
  const is_array = Array.isArray(elements);
  const level_id = get_hierarchy_id_by_level(level);
  if (!is_array) {
    if (level_id === path) return null;
  } else {
    for (let i = 0; i < elements.length; i++) {
      const element_id = update_hierarchy_id_by_index(path, i);
      const element = elements[i];
      if (element_id === path) {
        elements.splice(i, 1);
        return elements;
      }
      if (element.type == "folder" && element.children.length) {
        const children = element.children;
        const updated_children = remove_element_by_path(
          children,
          path,
          level + 1
        );
        if (updated_children) {
          elements[i] = {
            ...element,
            //@ts-ignore
            children: updated_children,
          };
          return elements;
        }
      }
    }
  }
  return null;
};

export const add_element_by_path = (
  elements: FileAndFoldersType | FileAndFoldersType[],
  element: FileAndFoldersType,
  level: number = 0
): FileAndFoldersType[] | null => {
  const is_array = Array.isArray(elements);
  const level_id = get_hierarchy_id_by_level(level);
  if (level_id === "" && is_array) {
    elements.push(element);
    return elements;
  }
  if (!is_array) {
    return null;
  } else {
    for (let i = 0; i < elements.length; i++) {
      const element_id = update_hierarchy_id_by_index(level_id, i);
      const element_item = elements[i];
      if (element_id === level_id) {
        elements.push(element);
        return elements;
      }
      if (element_item.type == "folder" && element_item.children.length) {
        const children = element_item.children;
        const updated_children = add_element_by_path(
          children,
          element,
          level + 1
        );
        if (updated_children) {
          elements[i] = {
            ...element_item,
            //@ts-ignore
            children: updated_children,
          };
          return elements;
        }
      }
    }
  }
  return null;
};

export const create_folder = ({ path, ...rest }: FolderAdd): ApiFolder => {
  return {
    id: shortid.generate(),
    type: "folder",
    ...rest,
    children: [],
    version: "1.0.0",
    created_at: new Date(),
    updated_at: new Date(),
  };
};

export const create_file = ({ path, ...rest }: FileAdd): ApiFile => {
  return {
    id: shortid.generate(),
    type: "file",
    ...rest,
    params: {},
    responses: [],
    version: "1.0.0",
    created_at: new Date(),
    updated_at: new Date(),
  };
};

