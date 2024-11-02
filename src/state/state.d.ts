interface UserType {
  name: string;
}

interface UserStoreGet {
  user: UserType;
}

interface UserStoreSet {
  set_user: (user: UserType) => void;
}

type UserStore = UserStoreGet & UserStoreSet;

interface ProcessStoreGet {
  sidebar: {
    open: boolean;
  };
}

interface ProcessStoreSet {
  set_sidebar: (open: boolean) => void;
  toggle_sidebar: () => void;
}

type ProcessStore = ProcessStoreGet & ProcessStoreSet;

// {
//   name: "Test Project",
//   description: "Test Description",
//   tags: ["test", "new"],
//   created_at: new Date(),
//   id: "test",
// },

interface ProjectStoreGet {
  projects: Project[];
  current_project: Project | null;
  current_project_id: string | null;
}

interface ProjectStoreSet {
  add_project: (project: Project) => void;
  open_project: (id: string) => string;
  update_project: (id: string, project: Project) => void;
  remove_project: (id: string) => void;
}

type ProjectStore = ProjectStoreGet & ProjectStoreSet;
