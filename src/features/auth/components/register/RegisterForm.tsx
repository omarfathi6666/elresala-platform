"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import AuthInput from "../shared/AuthInput";
import AuthLogo from "../shared/AuthLogo";

type RegisterFormData = {
  fullName: string;
  phone: string;
  email: string;
  province: string;
  grade: string;
  parentPhone: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <>
      <AuthLogo />

      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900">
          إنشاء حساب جديد
        </h2>

        <p className="mt-2 text-slate-500">
          أدخل بياناتك لبدء الدراسة على منصة الرسالة.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <AuthInput
          label="الاسم بالكامل"
          placeholder="الاسم بالكامل"
          error={errors.fullName?.message}
          {...register("fullName", {
            required: "الاسم مطلوب",
          })}
        />

        <AuthInput
          label="رقم الهاتف"
          placeholder="01xxxxxxxxx"
          error={errors.phone?.message}
          {...register("phone", {
            required: "رقم الهاتف مطلوب",
          })}
        />

        <AuthInput
          label="البريد الإلكتروني (اختياري)"
          type="email"
          placeholder="example@email.com"
          {...register("email")}
        />

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            المحافظة
          </label>

          <select
            {...register("province", {
              required: "المحافظة مطلوبة",
            })}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">اختر المحافظة</option>

            <option>القاهرة</option>
            <option>الجيزة</option>
            <option>الإسكندرية</option>
            <option>القليوبية</option>
            <option>الشرقية</option>
            <option>الدقهلية</option>
            <option>الغربية</option>
            <option>المنوفية</option>
            <option>البحيرة</option>
            <option>كفر الشيخ</option>
            <option>دمياط</option>
            <option>بورسعيد</option>
            <option>الإسماعيلية</option>
            <option>السويس</option>
            <option>الفيوم</option>
            <option>بني سويف</option>
            <option>المنيا</option>
            <option>أسيوط</option>
            <option>سوهاج</option>
            <option>قنا</option>
            <option>الأقصر</option>
            <option>أسوان</option>
            <option>البحر الأحمر</option>
            <option>الوادي الجديد</option>
            <option>مطروح</option>
            <option>شمال سيناء</option>
            <option>جنوب سيناء</option>
          </select>

          {errors.province && (
            <p className="text-sm text-red-500">
              {errors.province.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            المرحلة الدراسية
          </label>

          <select
            {...register("grade", {
              required: "اختر المرحلة الدراسية",
            })}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">اختر المرحلة</option>

            <option value="grade1">
              الصف الأول الثانوي - علوم متكاملة
            </option>

            <option value="grade3">
              الصف الثالث الثانوي - أحياء
            </option>
          </select>

          {errors.grade && (
            <p className="text-sm text-red-500">
              {errors.grade.message}
            </p>
          )}
        </div>

        <AuthInput
          label="رقم هاتف ولي الأمر"
          placeholder="01xxxxxxxxx"
          error={errors.parentPhone?.message}
          {...register("parentPhone", {
            required: "رقم ولي الأمر مطلوب",
          })}
        />

        <AuthInput
          label="كلمة المرور"
          type="password"
          error={errors.password?.message}
          {...register("password", {
            required: "كلمة المرور مطلوبة",
          })}
        />

        <AuthInput
          label="تأكيد كلمة المرور"
          type="password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "تأكيد كلمة المرور مطلوب",
          })}
        />

        <button
          type="submit"
          className="w-full rounded-2xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700"
        >
          إنشاء الحساب
        </button>

        <p className="text-center text-sm text-slate-600">
          لديك حساب بالفعل؟{" "}
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