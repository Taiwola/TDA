// app/forgot-password/page.tsx
"use server";

import { FormTemplate } from "@/app/(auth)/component/templateForm";
import { redirect } from "next/navigation";

export default async function ForgotPassword() {
  // Simulated server action for sending reset email
  async function handleForgotPassword(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;

    // Mock logic: Replace with your actual password reset logic (e.g., emailing a reset link)
    if (!email || !email.includes("@")) {
      return redirect("/forgot-password?error=Please enter a valid email");
    }

    // Simulate sending email (replace with your email service integration)
    console.log(`[ForgotPassword] Sending reset link to: ${email}`);

    // Redirect to a confirmation page or back to login with a success message
    redirect("/login?message=Password reset link sent to your email");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <FormTemplate
        title="Reset Your Password"
        fields={[
          {
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            label: "Email",
            required: true,
          },
        ]}
        action={handleForgotPassword}
        buttonText="Send Reset Link"
        footerText="Remember your password?"
        footerLinkText="Sign In"
        footerLinkHref="/login"
      />
    </div>
  );
}
