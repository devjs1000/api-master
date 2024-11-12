import { create } from "zustand";

const initial_values: ModalStateGetter = {
  modal: null,
  modal_name: null,
};

export const useModalGlobalState = create<ModalState>((set) => ({
  ...initial_values,
  open_modal(modal_name, modal) {
    set((state) => ({ ...state, modal_name, modal }));
  },
  close_modal: () =>
    set((state) => ({ ...state, modal_name: null, modal: null })),
}));

