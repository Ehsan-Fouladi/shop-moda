"use client";

import type { AppNotification } from "@/features/account/types";
import { createContext, useContext, useMemo, useState } from "react";

interface NotificationsContextValue {
  notifications: AppNotification[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  remove: (id: string) => void;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(
  null,
);

/**
 * Single source of truth for the account area's notifications, so the list page,
 * navigation badges and overview stats stay in sync (UI-only, in-memory).
 */
export function NotificationsProvider({
  initialNotifications,
  children,
}: {
  initialNotifications: AppNotification[];
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const value = useMemo<NotificationsContextValue>(
    () => ({
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
      markRead: (id) =>
        setNotifications((list) =>
          list.map((n) => (n.id === id ? { ...n, read: true } : n)),
        ),
      markAllRead: () =>
        setNotifications((list) => list.map((n) => ({ ...n, read: true }))),
      remove: (id) =>
        setNotifications((list) => list.filter((n) => n.id !== id)),
    }),
    [notifications],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications(): NotificationsContextValue {
  const ctx = useContext(NotificationsContext);
  if (!ctx)
    throw new Error(
      "useNotifications must be used within NotificationsProvider",
    );
  return ctx;
}
