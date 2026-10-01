"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Headphones, Menu, Percent, User } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { mainNav } from "@/config/navigation";
import { useState } from "react";

/** Mobile/tablet navigation drawer — slides from the start (right) edge in RTL. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation (state adjusted during render instead of an effect).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="باز کردن منو"
        >
          <Menu className="size-5!" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-[86%] max-w-sm flex-col gap-0 p-0"
      >
        <SheetHeader className="border-b border-border p-4 text-start">
          <SheetTitle asChild>
            <div>
              <Logo />
            </div>
          </SheetTitle>
          <SheetDescription className="sr-only">
            منوی دسته‌بندی‌ها و دسترسی سریع
          </SheetDescription>
        </SheetHeader>

        <nav
          aria-label="منوی موبایل"
          className="flex-1 overflow-y-auto px-4 py-2"
        >
          <Accordion type="single" collapsible>
            {mainNav.map((item) =>
              item.megaColumns ? (
                <AccordionItem
                  key={item.href}
                  value={item.href}
                  className="border-border/60"
                >
                  <AccordionTrigger className="py-3.5 text-sm font-medium hover:no-underline">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link
                      href={item.href}
                      className="mb-2 block rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
                    >
                      همه محصولات {item.title}
                    </Link>
                    {item.megaColumns.map((col) => (
                      <div key={col.title} className="mb-3">
                        <p className="mb-1 px-3 text-xs font-bold text-muted-foreground">
                          {col.title}
                        </p>
                        <ul>
                          {col.links.map((link) => (
                            <li key={link.href + link.title}>
                              <Link
                                href={link.href}
                                className="block rounded-md px-3 py-2 text-sm text-foreground/85 hover:bg-muted hover:text-primary"
                              >
                                {link.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 border-b border-border/60 py-3.5 text-sm font-medium text-sale"
                >
                  <Percent className="h-4 w-4" aria-hidden="true" />
                  {item.title}
                </Link>
              ),
            )}
          </Accordion>

          <ul className="mt-4 space-y-1">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-md px-2 py-2.5 text-sm hover:bg-muted"
              >
                <User
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />{" "}
                حساب کاربری
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-md px-2 py-2.5 text-sm hover:bg-muted"
              >
                <Headphones
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />{" "}
                پشتیبانی
              </Link>
            </li>
          </ul>
        </nav>

        <Separator />
        <div className="flex items-center justify-between p-4">
          <a
            href={siteConfig.phoneHref}
            className="text-xs text-muted-foreground"
            dir="ltr"
          >
            {siteConfig.phone}
          </a>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            پوسته
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
