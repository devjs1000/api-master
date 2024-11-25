///<reference types="react" />

// DISCLOSURE
interface DisclosureHookReturnType {
  open: boolean;
  on_open: () => void;
  on_close: () => void;
  on_toggle: () => void;
  set_open: (value: boolean) => void;
}

type DisclosureHookType = (default_value?: boolean) => DisclosureHookReturnType;

// FORM
type ValidationFunctionType<T> = (value: T) => Promise<string | false>;

interface FormHookPropsType<T> {
  initial_value: T;
  validation_schema?: {
    [key in keyof T]: ValidationFunctionType<T[key]>;
  };
  on_submit: (values: T) => Promise<void>;
}

type UpdatePathType<T> = (obj: any, key: keyof T, value: any) => T;

type ExtractValuesType<T> = (key: keyof T) => any;

type HandleChangeType<T> = (keyName: keyof T) => (value: any) => void;

type HandleSubmitType = () => void;

type RegisterType<T> = (key: keyof T) => {
  value: T[key];
  onChange: (value: any) => void;
  error: FormErrorsType<T>[key];
};

type FormErrorsType<T> = {
  [key in keyof T]?: string | false;
};

type SetFormErrorsType<T> = React.Dispatch<
  React.SetStateAction<FormErrorsType<T>>
>;

type UpdateValueType = (path: string, value: any) => void;

type HandleResetType = () => void;

interface FormHookReturnType<T> {
  extract_values: ExtractValuesType<T>;
  values: T;
  handle_change: HandleChangeType<T>;
  handle_submit: HandleSubmitType;
  register: RegisterType<T>;
  errors: FormErrorsType<T>;
  set_errors: SetFormErrorsType<T>;
  update_value: UpdateValueType;
  handle_reset: HandleResetType;
}

type FormHookType<T> = <T>(
  props: FormHookPropsType<T>
) => FormHookReturnType<T>;

// NAVIGATION
interface NavigateOptionsType {
  replace?: boolean;
  state?: any;
}

type HandleNavigateType = (path: string, options?: NavigateOptionsType) => void;

type HandleGoBackType = () => void;

type UpdateSearchParamsType = (params: Record<string, string>) => void;

interface LocationType {
  state: any;
  key: string;
  pathname: string;
  search: string;
  hash: string;
}

interface NavigationReturnType {
  handle_navigate: HandleNavigateType;
  go_back: HandleGoBackType;
  search_params: URLSearchParams;
  location: LocationType;
  update_search_params: UpdateSearchParamsType;
}

type NavigationHookType = () => NavigationReturnType;
