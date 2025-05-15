"use client";

import { useSession } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";

export default function PeersPage() {
  const { t } = useLanguage();
  const { isAuthenticated } = useSession();

  const peers = useQuery(
    api.follows.getPeers,
    !isAuthenticated ? "skip" : undefined
  );

  return (
    <div>
      {peers === undefined && (
        <div className="text-center mt-12">
          <p>{t('followingPageLoading')}</p>
        </div>
      )}

      {peers && peers.length === 0 && (
        <>
          <h1 className="text-4xl font-bold text-center mb-4">
            {t('followingPageTitle')}
          </h1>
          <div className="flex flex-col items-center justify-center gap-8">
            <Image
              className="rounded-lg bg-white p-12"
              src="/followers.svg"
              alt={t('followingNoFollowersIconAlt')}
              width="400"
              height="400"
            />
            <div className="text-2xl font-bold">{t('followingNoFollowersText')}</div>

            <Button asChild>
              <Link href="/explore">{t('followingGoFollowButton')}</Link>
            </Button>
          </div>
        </>
      )}

      {peers && peers.length > 0 && (
        <>
          <h1 className="text-4xl font-bold">{t('followingPageTitle')}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
            {peers?.map((peer) => {
              return (
                <Link key={peer._id} href={`/profile/${peer._id}`}>
                  <div className="flex flex-col items-center gap-4 text-center">
                    <Avatar className="w-32 h-32 md:w-40 md:h-40">
                      <AvatarImage src={peer.profileImage} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <h1 className="text-xl md:text-2xl font-semibold truncate w-full">{peer.name}</h1>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
