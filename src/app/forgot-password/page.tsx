import AuthLayout from "@/features/auth/components/shared/AuthLayout";
import AuthSide from "@/features/auth/components/shared/AuthSide";
import ForgotPasswordForm from "@/features/auth/components/forgot-password";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout side={<AuthSide />}>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}