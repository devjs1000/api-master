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
  if (id === "") return index.toString() as Path;
  const paths = read_hierarchy_paths(id);
  paths[paths.length - 1] = index;
  return generate_hierarchy_id(paths);
};

export const get_path_from_id = (
  elements: FileAndFoldersType[],
  id: string,
  level = 1
): Path | undefined => {
  try {
    const is_array = Array.isArray(elements);
    if (!is_array) return;
    const hierarchy_id = get_hierarchy_id_by_level(level);
    for (let i = 0; i < elements.length; i++) {
      const current_element = elements[i];
      const element_path_id = update_hierarchy_id_by_index(hierarchy_id, i);
      if (current_element.id == id) return element_path_id;
      if (current_element.type == "folder" && current_element.children.length) {
        const children = current_element.children;
        const element_path_id = get_path_from_id(children, id, level + 1);
        if (element_path_id) return element_path_id;
      }
    }
  } catch (error) {
    console.error(error);
    return;
  }
};

export const get_element_by_path = (
  elements: FileAndFoldersType | FileAndFoldersType[],
  path: Path,
  level = 1
): FileAndFoldersType | undefined => {
  try {
    const is_array = Array.isArray(elements);
    if (!is_array) return;
    const hierarchy_id = get_hierarchy_id_by_level(level);
    for (let i = 0; i < elements.length; i++) {
      const element_id = update_hierarchy_id_by_index(hierarchy_id, i);
      const current_element = elements[i];
      if (element_id === path) {
        return current_element;
      }
      if (current_element.type == "folder" && current_element.children.length) {
        const children = current_element.children;
        const child = get_element_by_path(children, path, level + 1);
        if (child) return child;
      }
    }
  } catch (error) {
    console.error(error);
    return;
  }
};

export const add_element_by_path = (
  elements: FileAndFoldersType | FileAndFoldersType[],
  element: FileAndFoldersType,
  path: Path = "",
  level = 1
): FileAndFoldersType[] | undefined => {
  try {
    const is_array = Array.isArray(elements);
    if (path === "" && is_array) {
      elements.push(element);
      return elements;
    }
    if (!is_array) return;
    const hierarchy_id = get_hierarchy_id_by_level(level);
    for (let i = 0; i < elements.length; i++) {
      const element_id = update_hierarchy_id_by_index(hierarchy_id, i);
      const current_element = elements[i];
      if (element_id === path) {
        if (current_element.type !== "folder") return;
        current_element.children.push(element);
        return elements;
      }
      if (current_element.type == "folder" && current_element.children.length) {
        const children = current_element.children;
        const updated_children = add_element_by_path(
          children,
          element,
          path,
          level + 1
        );
        if (updated_children) {
          elements[i] = {
            ...current_element,
            children: updated_children,
          };
          return elements;
        }
      }
    }
    return;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const update_element_by_path = (
  elements: FileAndFoldersType | FileAndFoldersType[],
  updater: (element: FileAndFoldersType) => FileAndFoldersType,
  path: Path = "",
  level = 1
): FileAndFoldersType[] | undefined => {
  try {
    const is_array = Array.isArray(elements);
    if (path === "" && is_array) {
      return elements.map(updater);
    }
    if (!is_array) return;
    const hierarchy_id = get_hierarchy_id_by_level(level);
    for (let i = 0; i < elements.length; i++) {
      const element_id = update_hierarchy_id_by_index(hierarchy_id, i);
      const current_element = elements[i];
      if (element_id === path) {
        return elements.map((element, index) =>
          index === i ? updater(element) : element
        );
      }
      if (current_element.type == "folder" && current_element.children.length) {
        const children = current_element.children;
        const updated_children = update_element_by_path(
          children,
          updater,
          path,
          level + 1
        );
        if (updated_children) {
          elements[i] = {
            ...current_element,
            children: updated_children,
          };
          return elements;
        }
      }
    }
    return;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const remove_element_by_path = (
  elements: FileAndFoldersType | FileAndFoldersType[],
  path: Path = "",
  level = 1
): FileAndFoldersType[] | undefined => {
  try {
    const is_array = Array.isArray(elements);
    if (path === "" && is_array) {
      const response = confirm(
        "This will clear all the data in the project. Are you sure you want to delete this project?"
      );
      if (response) {
        return [];
      } else {
        return elements;
      }
    }
    if (!is_array) return;
    const hierarchy_id = get_hierarchy_id_by_level(level);
    for (let i = 0; i < elements.length; i++) {
      const element_id = update_hierarchy_id_by_index(hierarchy_id, i);
      const current_element = elements[i];
      if (element_id === path) {
        elements.splice(i, 1);
        return elements;
      }
      if (current_element.type == "folder" && current_element.children.length) {
        const children = current_element.children;
        const updated_children = remove_element_by_path(
          children,
          path,
          level + 1
        );
        if (updated_children) {
          elements[i] = {
            ...current_element,
            children: updated_children,
          };
          return elements;
        }
      }
    }
  } catch (error) {
    console.error(error);
    return;
  }
};

export const move_element_to_path = (
  elements: FileAndFoldersType | FileAndFoldersType[],
  old_path: Path,
  new_path: Path
): FileAndFoldersType[] | undefined => {
  try {
    console.log("moving element");
    console.log("old_path", old_path);
    console.log("new_path", new_path);
    const old_element = get_element_by_path(elements, old_path);
    if (!old_element) return;
    // const updated_elements = remove_element_by_path(elements, old_path);
    // if (!updated_elements) return;
    const updated_children = add_element_by_path(
      elements,
      old_element,
      new_path
    );
    if (!updated_children) {
      console.error("Error moving element");
      console.info("reverting changes");
      return remove_element_by_path(elements, new_path); 
    }

    return remove_element_by_path(updated_children, old_path);


    return updated_children;
  } catch (error) {
    console.error(error);
    return;
  }
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
