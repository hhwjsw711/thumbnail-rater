"use client"

import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/utils";
import { useSession } from "@clerk/nextjs";
import { UpgradeButton } from "@/components/upgrade-button";
import { useTranslations } from "next-intl";

const defaultErrorState = {
    title: "",
    imageA: "",
    imageB: "",
}

export default function CreatePage() {
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const createThumbnail = useMutation(api.thumbnails.createThumbnail);
    const [imageA, setImageA] = useState("");
    const [imageB, setImageB] = useState("");
    const [errors, setErrors] = useState(defaultErrorState);
    const { toast } = useToast();
    const router = useRouter();
    const session = useSession();
    const t = useTranslations('CreatePage');

    return (
        <div className="mt-16">
            <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>

            <p className="text-lg max-w-md mb-8">
            {t('description')}
            </p>

            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const title = formData.get("title") as string;
                    let newErrors = {
                        ...defaultErrorState,
                    }

                    if (!title) {
                        newErrors = {
                            ...newErrors,
                            title: "Please fill in this required field"
                        };
                    }

                    if (!imageA) {
                        newErrors = {
                            ...newErrors,
                            imageA: "Please fill in this required field"
                        };
                    }

                    if (!imageB) {
                        newErrors = {
                            ...newErrors,
                            imageB: "Please fill in this required field"
                        };
                    }

                    setErrors(newErrors);
                    const hasErrors = Object.values(newErrors).some(Boolean)

                    if (hasErrors) {
                        toast({
                            title: "Form Errors",
                            description: "Please fill fields on the page",
                            variant: "destructive",
                        })
                        return;
                    }

                    try {
                        const thumbnailId = await createThumbnail({
                            aImage: imageA,
                            bImage: imageB,
                            title,
                            profileImage: session.session?.user.imageUrl,
                        })

                        router.push(`/thumbnails/${thumbnailId}`);
                    } catch (err) {
                        toast({
                            title: "You ran out of a free credits",
                            description: <div>You must <UpgradeButton /> in order to create more thumbnail tests</div>,
                            variant: "destructive",
                        })
                    }
                }}
            >
                <div className="flex flex-col gap-4 mb-8">
                    <Label htmlFor="title">{t('label_title')}</Label>
                    <Input id="title" type="text" name="title" placeholder="Label your test to make it easier to manage later"
                        className={clsx({
                            border: errors.title,
                            "border-red-500": errors.title,
                        })}
                    />

                    {errors.title && (<div className="text-red-500">{errors.title}</div>)}
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div
                        className={clsx("flex flex-col gap-4 rounded p-2", {
                            border: errors.imageA,
                            "border-red-500": errors.imageA,
                        })}
                    >
                        <h2 className="text-2xl font-bold">{t('A_image_title')}</h2>

                        {imageA && (
                            <Image
                                width="600"
                                height="600"
                                alt="image test a"
                                src={getImageUrl(imageA)}
                            />
                        )}

                        <UploadButton
                            uploadUrl={generateUploadUrl}
                            fileTypes={["image/*"]}
                            onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                                setImageA((uploaded[0].response as any).storageId)
                            }}
                            onUploadError={(error: unknown) => {
                                alert(`ERROR! ${error}`);
                            }}
                        />

                        {errors.imageA && (<div className="text-red-500">{errors.imageA}</div>)}

                    </div>
                    <div className="flex flex-col gap-4">
                        <div
                            className={clsx("flex flex-col gap-4 rounded p-2", {
                                border: errors.imageB,
                                "border-red-500": errors.imageB,
                            })}
                        >
                            <h2 className="text-2xl font-bold">{t('B_image_title')}</h2>

                            {imageB && (
                                <Image
                                    width="600"
                                    height="600"
                                    alt="image test b"
                                    src={getImageUrl(imageB)}
                                />
                            )}

                            <UploadButton
                                uploadUrl={generateUploadUrl}
                                fileTypes={["image/*"]}
                                onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                                    setImageB((uploaded[0].response as any).storageId)
                                }}
                                onUploadError={(error: unknown) => {
                                    alert(`ERROR! ${error}`);
                                }}
                            />
                            {errors.imageB && (<div className="text-red-500">{errors.imageB}</div>)}
                        </div>
                    </div>
                </div>
                <Button>{t('button')}</Button>
            </form>
        </div>
    );
}
