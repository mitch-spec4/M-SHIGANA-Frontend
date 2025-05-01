
import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm";
import { AuthLayout } from "@/components/layout/AuthLayout";

const VerifyEmailPage = () => {
  return (
    <AuthLayout 
      title="Verify your email" 
      subtitle="We've sent a verification code to your email"
    >
      <VerifyEmailForm />
    </AuthLayout>
  );
};

export default VerifyEmailPage;
