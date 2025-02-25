type Result<T> = {
  code: number;
  message: string;
  data: T;
};

interface ILogin {
  success: boolean;
  message: string;
}

interface IRegister {
  success: boolean;
  message: string;
}
