import type { Metadata } from "next";

import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export const metadata: Metadata = {
  title: "تعیین رمز عبور جدید",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ResetPasswordForm />;
}
