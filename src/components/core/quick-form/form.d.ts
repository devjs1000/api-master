interface FormBaseInput {
  id: string;
  core_type: "input";
  type: FormInputType;
  label?: string;
  placeholder?: string; //default is empty
  required?: boolean; //default is false
  default_value?: any; //default is empty
  container?: {
    class_name?: string;
    style?: React.CSSProperties;
  };
  props?: any;
  children?: React.ReactNode;
}

interface FormBaseLayout {
  id: string;
  core_type: "layout";
  type?: FormLayoutType; //default is vertical
  title: string;
  description: string;
  children: (FormBaseInput | FormBaseLayout)[];
  scrollable?: boolean; //default is false
  layout?: {
    class_name?: string;
    style?: React.CSSProperties;
  };
  child_container?: {
    class_name?: string;
    style?: React.CSSProperties;
  };
  hide?: {
    title?: boolean; //default is false
    description?: boolean; //default is false
  };
}

interface FormCore {
  name: string;
  description: string;
  tags: string[];
  children: (FormBaseLayout | FormBaseInput)[];
}

type FormInputType = "text" | "textarea" | "tag" | "button";
type FormLayoutType = "horizontal" | "vertical";
