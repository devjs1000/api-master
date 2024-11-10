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
}

interface ProjectStoreSet {
  add_project: (project: ProjectAdd) => void;
  open_project: (id: string) => string;
  update_project: (id: string, project: ProjectUpdate) => void;
  remove_project: (id: string) => void;
}

type ProjectStore = ProjectStoreGet & ProjectStoreSet;

interface FormInput {
  project: {
    id?: string;
    name: string;
    description: string;
    tags: string[];
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
