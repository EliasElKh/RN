export type LoginFormProps = {
    onLoginSuccess: (email: string, password: string) => void;
    onForgotPassword?: (email: string) => void;
    error?: string | null;
    isLoading?: boolean;
  };
