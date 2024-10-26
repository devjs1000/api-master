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