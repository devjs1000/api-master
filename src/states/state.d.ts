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

interface ProjectStoreGet {
  projects: Project[];
  current_project: Project | null;
  current_project_id: string | null;
  selected_element: (FileAndFoldersType & { path: Path }) | null;
}

interface ProjectStoreSet {
  add_project: (project: ProjectAdd) => void;
  open_project: (id: string) => string;
  update_project: (id: string, project: ProjectUpdate) => void;
  remove_project: (id: string) => void;
  add_folder: (folder: FolderAdd) => void;
  add_file: (file: FileAdd) => void;
  update_folder: (folder: FolderUpdate) => void;
  update_file: (file: FileUpdate) => void;
  sync_selected_element: () => void;
  remove_element: (path: Path) => void;
  remove_element_by_id: (id: string) => void;
  select_element: (id: string) => void;
  move_element_by_id: (from: string, to: string) => string | void;
  move_element_by_path: (from: Path, to: Path) => void;
  get_path_from_id: (id: string) => Path | null;
  get_element_by_id: (id: string) => FileAndFoldersType | null;
}

type ProjectStore = ProjectStoreGet & ProjectStoreSet;

interface FormInput {
  project: {
    id?: string;
    name: string;
    description: string;
    tags: string[];
  };
  folder: {
    id?: string;
    name: string;
    path?: string;
  };
  file: {
    id?: string;
    name: string;
    path?: string;
  };
}
interface FormStateGetter {
  form: any;
  form_name: keyof FormInput | null;
  modal_input: {
    title: string;
    description: string;
  } | null;
}

interface FormStateSetter {
  open_form: <T extends keyof FormInput>(
    form_name: T,
    data: FormInput[T],
    modal_input: {
      title: string;
      description: string;
    }
  ) => void;
  close_form: () => void;
}

type FormState = FormStateGetter & FormStateSetter;

interface ModalInput {}
interface ModalStateGetter {
  modal: any;
  modal_name: keyof ModalInput | null;
}

interface ModalStateSetter {
  open_modal: <T extends keyof ModalInput>(
    modal_name: T,
    modal: ModalInput[T]
  ) => void;
  close_modal: () => void;
}

type ModalState = ModalStateGetter & ModalStateSetter;
