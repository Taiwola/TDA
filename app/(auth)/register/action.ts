"use server";

// Mock register action (replace with your actual Server Action)
export const registerAction = async (
  _prevState: Result<IRegister>, // First argument is previous state
  formData: FormData // Second argument is FormData
): Promise<Result<IRegister>> => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Simulate an API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!name || !email || !password) {
    return {
      code: 400,
      message: "All fields are required!",
      data: { success: false, message: "" },
    };
  }

  // Simulate successful registration
  return {
    code: 201,
    message: "Registration successful!",
    data: { success: true, message: "" },
  };
};
