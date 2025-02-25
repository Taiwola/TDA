"use client";
import React from "react";
import { useActionState } from "react"; // Or your framework's equivalent
import { FormTemplate } from "../../component/templateForm";
import { registerAction } from "../action";

export const initialResultState: Result<IRegister> = {
  code: 0,
  message: "",
  data: {} as ILogin,
};

export default function RegisterPage() {
  const [state, submitAction, isSubmitting] = useActionState(
    registerAction,
    initialResultState
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <FormTemplate
        title="Register"
        fields={[
          {
            name: "name",
            type: "text",
            placeholder: "Full Name",
            required: true,
          },
          {
            name: "email",
            type: "email",
            placeholder: "Email",
            required: true,
          },
          {
            name: "password",
            type: "password",
            placeholder: "Password",
            required: true,
          },
        ]}
        action={submitAction} // Pass the action function
        buttonText={isSubmitting ? "Registering......" : "Register"}
        footerText="Already have an account?"
        footerLinkText="Login"
        footerLinkHref="/login"
        error={state.message}
      />
    </div>
  );
}
