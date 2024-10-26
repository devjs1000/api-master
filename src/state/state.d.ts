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