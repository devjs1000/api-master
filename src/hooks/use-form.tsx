import { useState } from "react";
import _ from "lodash";

function use_form<T>({
  initial_value,
  validation_schema,
  on_submit,
}: UseFormProps<T>) {
  const [values, set_values] = useState<T>(initial_value as T);
  const [errors, set_errors] = useState<Record<keyof T, string | false>>(
    {} as any
  );

  const extract_values = (key: keyof T) => {
    return _.get(values, key);
  };

  const update_path = (obj: any, key: keyof T, value: any) => {
    const cloned_values: any = _.cloneDeepWith(obj);
    _.set(cloned_values, key, value);
    return cloned_values;
  };

  const handle_change = (keyName: keyof T) => (value: any) => {
    console.log(keyName, value);
    set_values((prev) => update_path(prev, keyName, value) as any as T);
  };

  const update_value = (path: string, value: any) => {
    set_values((prev) => {
      const cloned_values: any = _.cloneDeepWith(prev);
      _.set(cloned_values, path, value);
      return cloned_values;
    });
  };

  const handle_submit = async () => {
    set_errors({} as any);
    let numberOfErrors = 0;
    for (const key in values) {
      const validation = validation_schema?.[key];
      const value = values[key];
      const is_invalid = await validation?.(value);
      if (!is_invalid) continue;
      set_errors((prev) => ({
        ...prev,
        [key]: is_invalid,
      }));
      numberOfErrors++;
    }
    if (numberOfErrors > 0) {
      return;
    }
    on_submit(values)?.catch?.((error) => {
      console.error(error);
    });
  };

  const register = (key: keyof T) => ({
    value: values[key],
    onChange: handle_change(key),
    error: errors[key],
  });

  return {
    extract_values,
    values,
    handle_change,
    handle_submit,
    register,
    errors,
    set_errors,
    update_value,
  };
}

export default use_form;

interface UseFormProps<T> {
  initial_value: T;
  validation_schema?: {
    [key in keyof T]: (value: T[key]) => string | false;
  };
  on_submit: (values: T) => Promise<void>;
}

export type UseFormReturn<T> = ReturnType<typeof use_form<T>>;