"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";
import { formatDistance } from 'date-fns'
import { SkeletonCard } from "@/components/skeleton-card";
import { useTranslations } from "next-intl";
import NavigationLink from "../NavigationLink";
import { locales } from "@/config";

export default function DashboardPage() {

    const thumbnails = useQuery(api.thumbnails.getThumbnailsForUser);

    const sortedThumbnails = [...(thumbnails ?? [])].reverse();
    const t = useTranslations('DashboardPage');

    return (
        <div className="">
            <h1 className="text-center text-4xl font-bold mb-12 mt-8">
                {t('title')}
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
                        alt="no found icon"
                        width="400"
                        height="400"
                    />
                    <div className="text-2xl font-bold">{t('description')}</div>

                    <Button asChild>
                        <NavigationLink href="/create">{t('create_button')}</NavigationLink>
                    </Button>
                </div>
            )}

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {sortedThumbnails?.map(thumbnail => {
                    return (
                        <Card key={thumbnail._id}>
                            <CardHeader>
                                <Image
                                    src={getImageUrl(thumbnail.aImage)}
                                    width="600"
                                    height="600"
                                    alt="thumbnail image"
                                />
                            </CardHeader>
                            <CardContent>
                                <p>{thumbnail.title}</p>
                                <p>{formatDistance(new Date(thumbnail._creationTime), new Date(), { addSuffix: true, })}</p>
                                <p>Votes: {thumbnail.aVotes + thumbnail.bVotes}</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" asChild>
                                    <NavigationLink href={`/thumbnails/${thumbnail._id}` as '/thumbnails/:id'}>{t('view_button')}</NavigationLink>
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
