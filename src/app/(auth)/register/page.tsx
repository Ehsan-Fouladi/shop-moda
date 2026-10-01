import type { Metadata } from "next";

import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "ثبت‌نام",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <RegisterForm />;
}
