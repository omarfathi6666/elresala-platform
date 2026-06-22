import AuthLayout from "@/features/auth/components/shared/AuthLayout";
import AuthSide from "@/features/auth/components/shared/AuthSide";
import RegisterForm from "@/features/auth/components/register";

export default function RegisterPage() {
  return (
    <AuthLayout side={<AuthSide />}>
      <RegisterForm />
    </AuthLayout>
  );
}