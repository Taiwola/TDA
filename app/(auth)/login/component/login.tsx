"use client";
import React from "react";
import { useActionState } from "react";
import { LoginUser } from "./action";
import { FormTemplate } from "../../component/templateForm";

export const initialResultState: Result<ILogin> = {
  code: 0,
  message: "",
  data: {} as ILogin,
};

export default function LoginPage() {
  const [data, action, pending] = useActionState(LoginUser, initialResultState);

  console.log(data);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <FormTemplate
        title="Login"
        fields={[
          {
            name: "email",
            type: "email",
            placeholder: "Email",
            label: "Email",
            required: true,
          },
          {
            name: "password",
            type: "password",
            label: "Password",
            placeholder: "Password",
            required: true,
          },
        ]}
        action={action}
        buttonText={pending ? "Logging in..." : "Login"}
        footerText="Don't have an account?"
        footerLinkText="Sign up"
        footerLinkHref="/register"
        forgotPasswordLinkHref="/forgot-password" // Added Forgot Password link
        error={data.message}
      />
      {/* Optional: Keep this if you want a separate success/error message outside the form */}
      {/* {data?.message && <p className="mt-4 text-center text-red-500">{data.message}</p>} */}
    </div>
  );
}
