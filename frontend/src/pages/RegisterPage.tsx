
import { RegisterForm } from "@/components/auth/RegisterForm";
import { AuthLayout } from "@/components/layout/AuthLayout";

const RegisterPage = () => {
  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Enter your details to get started"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
