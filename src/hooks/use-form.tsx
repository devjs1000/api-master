import { useState } from "react";
import _ from "lodash";

function use_form<T>({
  initial_value,
  validation_schema,
  on_submit,
}: FormHookPropsType<T>): FormHookReturnType<T> {
  const [values, set_values] = useState<T>(initial_value);
  const [errors, set_errors] = useState<FormErrorsType<T>>({});

  const extract_values: ExtractValuesType<T> = (key) => {
    return _.get(values, key);
  };

  const update_path: UpdatePathType<T> = (obj, key, value) => {
    const cloned_values = _.cloneDeepWith(obj);
    _.set(cloned_values, key, value);
    return cloned_values;
  };

  const handle_change: HandleChangeType<T> = (keyName) => (value) => {
    set_values((prev) => update_path(prev, keyName, value));
  };

  const update_value: UpdateValueType = (path, value) => {
    set_values((prev) => {
      const cloned_values = _.cloneDeepWith(prev)
      _.set<any>(cloned_values, path, value);
      return cloned_values;
    });
  };

  const handle_submit:HandleSubmitType = async () => {
    set_errors({});
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

  const register:RegisterType<T> = (key) => ({
    value: values[key],
    onChange: handle_change(key),
    error: errors[key],
  });

  const handle_reset:HandleResetType = () => {
    set_values(initial_value);
    set_errors({} as any);
  };
  return {
    extract_values,
    values,
    handle_change,
    handle_submit,
    register,
    errors,
    set_errors,
    update_value,
    handle_reset,
  };
}

export default use_form;