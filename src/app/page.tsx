"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/utils";
import { SignIn, useSignIn } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/nextjs";
import { useLanguage } from "@/lib/i18n/language-context";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { t } = useLanguage();
  const { isAuthenticated, isLoading } = useSession();
  const signIn = useSignIn();

  return (
    <main className="">
      <section className="mt-24 flex flex-col items-center gap-8 pb-24">
        <Image
          src="/hero.jpeg"
          width="300"
          height="300"
          alt="hero banner"
          className="rounded-xl"
        />
        <h1 className="text-center max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
          {t('heroTitle')}
        </h1>
        <p className="text-center text-gray-700 dark:text-gray-300 text-xl max-w-lg mx-auto">
          {t('heroDescription')}
        </p>
        {!isLoading &&
          (isAuthenticated ? (
            <Button asChild>
              <Link href="/create">{t('createThumbnail')}</Link>
            </Button>
          ) : (
            <SignInButton>
              <Button>{t('signInToGetStarted')}</Button>
            </SignInButton>
          ))}
      </section>
    </main>
  );
}
