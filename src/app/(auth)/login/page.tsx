import type { Metadata } from "next";

import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "ورود",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LoginForm />;
}
