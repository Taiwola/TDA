// app/reset-password/page.tsx
"use server";
import { redirect } from "next/navigation";
import { FormTemplate } from "../(auth)/component/templateForm";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { token?: string; error?: string };
}) {
  // Ensure token is present
  const token = searchParams.token;
  if (!token) {
    return redirect("/forgot-password?error=Invalid or missing reset token");
  }

  // Server action to handle password reset
  async function handleResetPassword(formData: FormData) {
    "use server";
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Basic validation
    if (!password || password.length < 6) {
      return redirect(
        `/reset-password?token=${token}&error=Password must be at least 6 characters`
      );
    }
    if (password !== confirmPassword) {
      return redirect(
        `/reset-password?token=${token}&error=Passwords do not match`
      );
    }

    // Mock logic: Replace with your actual password reset logic
    // e.g., Verify token with your auth service and update user's password
    console.log(`[ResetPassword] Resetting password for token: ${token}`);
    console.log(`New password: ${password}`);

    // Simulate success (replace with actual password update)
    // For example, update user in your database and invalidate token
    const isValidToken = true; // Replace with real token validation
    if (!isValidToken) {
      return redirect(
        `/reset-password?token=${token}&error=Invalid or expired token`
      );
    }

    // On success, redirect to login with a message
    redirect("/login?message=Password reset successfully. Please sign in.");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <FormTemplate
        title="Reset Your Password"
        fields={[
          {
            name: "password",
            type: "password",
            placeholder: "Enter new password",
            label: "New Password",
            required: true,
          },
          {
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm new password",
            label: "Confirm Password",
            required: true,
          },
        ]}
        action={handleResetPassword}
        buttonText="Reset Password"
        footerText="Back to"
        footerLinkText="Sign In"
        footerLinkHref="/login"
        error={searchParams.error}
      />
    </div>
  );
}
