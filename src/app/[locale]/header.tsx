"use client"

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle"
import Link from "next/link";
import { useIsSubscribed } from "@/hooks/useIsSubscribed";
import { UpgradeButton } from "@/components/upgrade-button";
import LocaleSwitcher from "./LocaleSwitcher";
import { useTranslations } from "next-intl";
import NavigationLink from "./NavigationLink";

export function Header() {
    const isSubscriped = useIsSubscribed();
    const t = useTranslations('HeaderPage');

    return (
        <div className="border-b">
            <div className="h-16 container flex justify-between items-center">
                <NavigationLink href="/">{t('home')}</NavigationLink>
                <div className="flex gap-8">
                    <SignedIn>
                        <NavigationLink href="/dashboard">{t('dashboard')}</NavigationLink>
                        <NavigationLink href="/create">{t('create')}</NavigationLink>
                        <NavigationLink href="/explore">{t('explore')}</NavigationLink>
                    </SignedIn>
                    <SignedOut>
                        <NavigationLink href="/pricing">{t('pricing')}</NavigationLink>
                        <NavigationLink href="/about">{t('about')}</NavigationLink>
                    </SignedOut>
                </div>

                <div className="flex gap-4 items-center">
                    <SignedIn>
                        {!isSubscriped && (
                            <UpgradeButton />
                        )}
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <LocaleSwitcher />
                    <ModeToggle />
                </div>
            </div >
        </div >
    );
}
