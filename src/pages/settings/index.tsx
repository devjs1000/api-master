import { QuickForm } from "@/components/core/quick-form";
import { Container } from "@/components/custom";
import use_form from "@/hooks/use-form";
import {} from "react";

const Settings = (_props: ISettingsProps) => {
  const form = use_form({
    initial_value: {},
    async on_submit() {},
  });

  return (
    <Container className="w-[60%]" all_center>
      <QuickForm<typeof form.values>
        form={form}
        defination={{
          name: "settings",
          description: "Settings",
          tags: ["settings"],
          children: [
            {
              core_type: "layout",
              type: "horizontal",
              title: "Account",
              description: "Account settings",
              id: "account",
              children: [
                {
                  core_type: "layout",
                  type: "vertical",
                  id: "info",
                  title: "Info",
                  description: "Your name",
                  hide: {
                    title: true,
                    description: true,
                  },
                  children: [
                    {
                      core_type: "input",
                      type: "text",
                      placeholder: "First Name",
                      label: "First Name",
                      id: "first_name",
                      required: true,
                    },
                    {
                      core_type: "input",
                      type: "text",
                      placeholder: "Last Name",
                      label: "Last Name",
                      id: "last_name",
                      required: true,
                    },
                    {
                      core_type: "input",
                      type: "email",
                      placeholder: "Email",
                      label: "Email",
                      id: "email",
                      required: true,
                    },
                  ],
                },
                {
                  core_type: "layout",
                  type: "vertical",
                  id: "credentials",
                  title: "Credentials",
                  description: "Your Credentials",
                  hide: {
                    title: true,
                    description: true,
                  },
                  children: [
                    {
                      core_type: "input",
                      type: "password",
                      placeholder: "Password",
                      label: "Password",
                      id: "password",
                      required: true,
                    },
                    {
                      core_type: "input",
                      type: "password",
                      placeholder: "Confirm Password",
                      label: "Confirm Password",
                      id: "confirm_password",
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              core_type: "input",
              type: "button",
              id: "submit",
              children: "Save",
              container: {
                class_name: "max-w-[100%]",
              },
            },
          ],
        }}
      />
    </Container>
  );
};

export default Settings;

interface ISettingsProps {}
