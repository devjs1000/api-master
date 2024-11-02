import { UseFormReturn } from "@/hooks/use-form";
import { InputController } from "./input-controller";

export function BaseInput<T>({ form, ...rest }: IBaseInputProps<T>) {
  return (
    <InputController
      {...rest}
      onChange={form.handle_change(rest?.id as keyof T)}
      value={form?.values[rest?.id as keyof T]}
    />
  );
}

interface IBaseInputProps<T> extends FormBaseInput {
  form: UseFormReturn<T>;
}
