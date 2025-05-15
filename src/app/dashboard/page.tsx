"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSession } from "@/lib/utils";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { SkeletonCard } from "@/components/skeleton-card";
import { getTotalVotes } from "@/util/getTotalVotes";
import { useLanguage } from "@/lib/i18n/language-context";

export default function DashboardPage() {
  const { t } = useLanguage();
  const { isAuthenticated } = useSession();
  const thumbnails = useQuery(
    api.thumbnails.getMyThumbnails,
    !isAuthenticated ? "skip" : undefined
  );

  const sortedThumbnails = [...(thumbnails ?? [])].reverse();

  return (
    <div className="">
      <h1 className="text-center text-4xl font-bold mb-12">
        {t('dashboardTitle')}
      </h1>

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
            alt={t('dashboardNoFoundIconAlt')}
            width="400"
            height="400"
          />
          <div className="text-2xl font-bold">{t('dashboardNoTests')}</div>

          <Button asChild>
            <Link href="/create">{t('dashboardCreateTestButton')}</Link>
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
                      alt={t('dashboardImageTestAlt')}
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
                    }
                  )}
                </p>
                <p>{t('dashboardVotesLabel')}: {getTotalVotes(thumbnail)}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/thumbnails/${thumbnail._id}`}>
                    {t('dashboardViewResultsButton')}
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
