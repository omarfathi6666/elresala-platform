"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import AuthInput from "../shared/AuthInput";
import AuthLogo from "../shared/AuthLogo";

type ForgotPasswordFormData = {
  email: string;
};

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log(data);
  };

  return (
    <>
      <AuthLogo />

      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900">
          استعادة كلمة المرور
        </h2>

        <p className="mt-2 text-slate-500">
          أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <AuthInput
          label="البريد الإلكتروني"
          type="email"
          placeholder="example@email.com"
          error={errors.email?.message}
          {...register("email", {
            required: "البريد الإلكتروني مطلوب",
          })}
        />

        <button
          type="submit"
          className="w-full rounded-2xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700"
        >
          إرسال الرابط
        </button>

        <p className="text-center text-sm text-slate-600">
          تذكرت كلمة المرور؟{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            تسجيل الدخول
          </Link>
        </p>
      </form>
    </>
  );
}