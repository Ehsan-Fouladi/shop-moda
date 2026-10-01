import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export const metadata: Metadata = {
  title: "بازیابی رمز عبور",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ForgotPasswordForm />;
}
