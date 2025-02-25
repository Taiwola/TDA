"use client";
import React from "react";
import { useActionState } from "react"; // ✅ Correct import
import { FormTemplate } from "../../component/templateForm";
import { LoginUser } from "./action";

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
            required: true,
          },
          {
            name: "password",
            type: "password",
            placeholder: "Password",
            required: true,
          },
        ]}
        action={action}
        buttonText={pending ? "Logging in..." : "Login"}
        footerText="Don't have an account?"
        footerLinkText="Sign up"
        footerLinkHref="/register"
        error={data.message}
      />
      {/* {data?.message && <p className="mt-4 text-center text-red-500">{data.message}</p>} ✅ Display server response */}
    </div>
  );
}
