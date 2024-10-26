import { create } from "zustand";

const inital_user_state: UserStoreGet = {
  user: {
    name: "John Doe",
  },
};

export const use_user_store = create<UserStore>((set, get) => {
  return {
    ...inital_user_state,
    set_user: (user: UserType) => {
      set({
        user: user,
      });
    },
  };
});
