import { create } from "zustand";

const inital_process_state: ProcessStoreGet = {
  sidebar: {
    open: true,
  },
};

export const use_process_store = create<ProcessStore>((set, get) => {
  return {
    ...inital_process_state,
    set_sidebar: (open: boolean) => {
      set({
        sidebar: {
          open: open,
        },
      });
    },
    toggle_sidebar: () => {
      set((state) => {
        return {
          sidebar: {
            open: !state.sidebar.open,
          },
        };
      });
    },
  };
});
