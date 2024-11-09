import { create } from "zustand";

const initial_values: FormStateGetter = {
  form: null,
  form_name: null,
  modal_input: null,
};

export const use_form_global_state = create<FormState>((set) => ({
  ...initial_values,
  open_form(form_name, data, modal_input) {
    set({
      form_name,
      form: data,
      modal_input,
    });
  },
  close_form() {
    set({ form_name: null, form: null });
  },
}));
