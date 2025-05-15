"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useMutation, useQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSession } from "@/lib/utils";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { SkeletonCard } from "@/components/skeleton-card";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Id } from "../../../../convex/_generated/dataModel";
import { getTotalVotes } from "@/util/getTotalVotes";
import { useLanguage } from "@/lib/i18n/language-context";

function UserThumbnails() {
  const params = useParams<{ userId: string }>();
  const { t, dateFnsLocale } = useLanguage();
  const thumbnails = useQuery(api.thumbnails.getThumbnailsForUser, {
    userId: params.userId,
  });

  const sortedThumbnails = [...(thumbnails ?? [])].reverse();

  return (
    <div>
      {thumbnails === undefined && (
        <div className="animate-pulse mb-12 mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {thumbnails && thumbnails.length === 0 && (
        <div className="flex flex-col items-center gap-8">
          <Image
            className="rounded-lg bg-white p-12"
            src="/void.svg"
            alt="no found icon"
            width="400"
            height="400"
          />
          <div className="text-2xl font-bold">{t('profileNoThumbnailTests')}</div>

          <Button asChild>
            <Link href="/create">{t('profileCreateThumbnailTestButton')}</Link>
          </Button>
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {sortedThumbnails?.map((thumbnail) => {
          return (
            <Card key={thumbnail._id}>
              <CardHeader>
                <div className="relative aspect-[1280/720]">
                  {thumbnail.urls[0] && (
                    <Image
                      alt={t('profileImageTestAlt')}
                      className="object-cover"
                      src={thumbnail.urls[0]}
                      layout="fill"
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p>{thumbnail.title}</p>
                <p>
                  {formatDistance(
                    new Date(thumbnail._creationTime),
                    new Date(),
                    {
                      addSuffix: true,
                      locale: dateFnsLocale,
                    }
                  )}
                </p>
                <p>{t('profileVotesLabel')}: {getTotalVotes(thumbnail)}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/thumbnails/${thumbnail._id}`}>
                  {t('profileViewResultsButton')}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const params = useParams<{ userId: Id<"users"> }>();
  const { isAuthenticated } = useSession();
  const { t } = useLanguage();

  const profile = useQuery(api.users.getProfile, {
    userId: params.userId,
  });
  const follow = useQuery(
    api.follows.getFollow,
    !isAuthenticated
      ? "skip"
      : {
          targetUserId: params.userId,
        }
  );
  const followUser = useMutation(api.follows.followUser);
  const unfollowUser = useMutation(api.follows.unfollowUser);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 mt-12">
      <div className="flex flex-col gap-2 items-center">
        <Avatar className="w-40 h-40">
          <AvatarImage src={profile?.profileImage} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <h1 className="text-2xl">{profile?.name}</h1>

        {follow ? (
          <Button
            onClick={() => {
              unfollowUser({
                targetUserId: params.userId,
              });
            }}
            variant={"destructive"}
          >
            {t('profileUnfollowButton')}
          </Button>
        ) : (
          <Button
            onClick={() => {
              followUser({
                targetUserId: params.userId,
              });
            }}
          >
            {t('profileFollowButton')}
          </Button>
        )}
      </div>

      <div className="col-span-2">
        <h1 className="text-4xl font-bold mt-12 md:mt-4">{t('profileThumbnailsTitle')}</h1>

        <UserThumbnails />
      </div>
    </div>
  );
}
