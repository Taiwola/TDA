"use server";

export async function LoginUser(
  _prevState: Result<ILogin>, // ✅ First argument should be previous state
  formData: FormData // ✅ Second argument should be FormData
): Promise<Result<ILogin>> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      code: 400,
      message: "Email and password are required!",
      data: { success: false, message: "" },
    };
  }

  // Simulate authentication logic
  if (email === "test@example.com" && password === "password") {
    return {
      code: 200,
      message: "Login successful!",
      data: { success: true, message: "" },
    };
  }

  return {
    code: 401,
    message: "Invalid email or password!",
    data: { success: false, message: "" },
  };
}
