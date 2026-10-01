import type { Metadata } from "next";

import { DashboardHeader } from "@/features/account/components/dashboard-ui";
import {
  ChangePasswordForm,
  ProfileForm,
} from "@/features/account/components/profile-forms";
import { currentUser } from "@/features/account/data/account";

export const metadata: Metadata = { title: "پروفایل" };

export default function ProfilePage() {
  return (
    <div className="space-y-5">
      <DashboardHeader
        title="پروفایل"
        description="اطلاعات شخصی و امنیت حساب کاربری"
      />
      <ProfileForm user={currentUser} />
      <ChangePasswordForm />
    </div>
  );
}
