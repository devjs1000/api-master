const projects_key = "projects";
export const local_stored_projects = () => localStorage.getItem(projects_key);
export const local_projects = () => {
  const projects_stored = local_stored_projects();
  return projects_stored ? JSON.parse(projects_stored) : [];
};
export const local_get_project = (id: string) => {
  return local_projects().find((project: Project) => project.id === id) || null;
};
export const local_add_project = (project: Project) => {
  const projects_list = local_projects();
  projects_list.unshift(project);
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
}
export const local_projects_without_children = () => {
  return local_projects().map((project: Project) => {
    return {
      ...project,
      children: null,
    };
  });
};
