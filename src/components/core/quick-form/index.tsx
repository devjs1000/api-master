import { Container } from "@/components/custom";
import { BaseLayout } from "./base-layout";
import { BaseInput } from "./base-input";
import { UseFormReturn } from "@/hooks/use-form";

export function QuickForm<T>({ defination, form }: IQuickFormProps<T>) {
  return (
    <Container reset_ui>
      {defination.children.map((child, index) => {
        if (child.core_type == "layout") {
          return <BaseLayout<T> key={index} {...child} form={form} />;
        } else if (child.core_type == "input") {
          return <BaseInput<T> key={index} {...child} form={form} />;
        }
      })}
    </Container>
  );
}

interface IQuickFormProps<T> {
  defination: FormCore;
  form: UseFormReturn<T>;
}
