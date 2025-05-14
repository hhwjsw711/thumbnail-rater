"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { ChangeLanguage } from "./change-language";
import { ModeToggle } from "./mode-toggle";
import { useLanguage } from "@/lib/i18n/language-context";
import Link from "next/link";
import { useSession } from "@/lib/utils";
import MobileNav, { MenuToggle, useMobileNavState } from "./mobile-nav";
import Image from "next/image";
import { BellIcon, MessageCircleHeart } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Feedback from "./feedback";

const NotificationIcon = () => {
  const hasUnread = useQuery(api.notification.hasUnread);

  return (
    <Link href="/notifications" className="relative">
      <BellIcon />
      {hasUnread && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
      )}
    </Link>
  );
};

export function Header() {
  const { t } = useLanguage();

  const { isLoading, isAuthenticated } = useSession();

  const { isOpen, toggleOpen } = useMobileNavState();

  return (
    <div className="border-b dark:bg-gray-900">
      <MobileNav isOpen={isOpen} toggleOpen={toggleOpen} />

      <div className="h-16 container flex justify-between items-center">
        <Link
          href="/"
          className="flex gap-2 items-center relative flex-shrink-0"
        >
          <Image
            className="rounded"
            src="/hero.jpeg"
            alt="logo"
            width="40"
            height="40"
          />
          <span className="text-xs md:text-base hidden sm:block">
            {t('thumbnailRater')}
          </span>
        </Link>

        <div className="gap-4 hidden md:flex md:gap-8 text-xs md:text-base">
          {!isLoading && isAuthenticated && (
            <>
              <Link href="/dashboard" className="link">
                {t('dashboard')}
              </Link>
              <Link href="/create" className="link">
                {t('create')}
              </Link>
              <Link href="/explore" className="link">
                {t('explore')}
              </Link>
              <Link href="/following" className="link">
                {t('following')}
              </Link>
              <Link href="/account" className="link">
                {t('account')}
              </Link>
            </>
          )}

          <Link href="/changelog" className="link">
            {t('changelog')}
          </Link>

          <Link href="/roadmap" className="link">
            {t('roadmap')}
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          {!isLoading && (
            <>
              {isAuthenticated && (
                <>
                  <Feedback
                    triggerContent={
                      <button>
                        <MessageCircleHeart />
                      </button>
                    }
                  />

                  <NotificationIcon />

                  <UserButton />
                </>
              )}
              {!isAuthenticated && <SignInButton />}
            </>
          )}

          <ChangeLanguage />

          <ModeToggle />

          {!isLoading && isAuthenticated && (
            <MenuToggle toggle={toggleOpen} />
          )}
        </div>
      </div>
    </div>
  );
}
