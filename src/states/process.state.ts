import { create } from "zustand";

const inital_process_state: ProcessStoreGet = {
  sidebar: {
    project: true,
  },
  navbar: {
    project: true,
  },
};

export const use_process_store = create<ProcessStore>((set, _get) => {
  return {
    ...inital_process_state,
    set_sidebar: (name, state) => {
      set({
        sidebar: {
          [name]: state,
        },
      });
    },
    toggle_sidebar: (name) => {
      set((state) => {
        return {
          sidebar: {
            [name]: !state.sidebar[name],
          },
        };
      });
    },
    set_navbar: (name, state) => {
      set({
        navbar: {
          [name]: state,
        },
      });
    },
    toggle_navbar: (name) => {
      set((state) => {
        return {
          navbar: {
            [name]: !state.navbar[name],
          },
        };
      });
    },
  };
});
