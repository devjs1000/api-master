import { useState } from "react";

export const use_disclosure: DisclosureHookType = (default_value = false) => {
  const [open, set_open] = useState(default_value);
  const on_open = () => set_open(true);
  const on_close = () => set_open(false);
  const on_toggle = () => set_open((prev) => !prev);
  return {
    open,
    on_open,
    on_close,
    on_toggle,
    set_open,
  };
};
