"use client";

import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { UpgradeButton } from "@/components/upgrade-button";
import { Id } from "../../../convex/_generated/dataModel";
import { XIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

const defaultErrorState = {
  title: "",
  images: "",
};

function ConvexImage({ imageId }: { imageId: Id<"_storage"> }) {
  const imageUrl = useQuery(api.files.getImageUrl, { imageId });

  return (
    imageUrl && (
      <Image
        alt="image test image"
        className="object-cover"
        src={imageUrl}
        layout="fill"
      />
    )
  );
}

export default function CreatePage() {
  const { t } = useLanguage();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createThumbnail = useAction(api.thumbnails.createThumbnailAction);
  const { toast } = useToast();
  const router = useRouter();
  const [errors, setErrors] = useState(defaultErrorState);
  const [images, setImages] = useState<Id<"_storage">[]>([]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">{t('createPageTitle')}</h1>

      <p className="text-lg max-w-md mb-8">
        {t('createPageDescription')}
      </p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const title = formData.get("title") as string;
          let newErrors = {
            ...defaultErrorState,
          };

          if (!title) {
            newErrors = {
              ...newErrors,
              title: t('errorFillRequiredField'),
            };
          }

          if (images.length < 2) {
            newErrors = {
              ...newErrors,
              images: t('errorMinTwoThumbnails'),
            };
          }

          setErrors(newErrors);
          const hasErrors = Object.values(newErrors).some(Boolean);

          if (hasErrors) {
            toast({
              title: t('toastFormErrorsTitle'),
              description: t('toastFormErrorsDescription'),
              variant: "destructive",
            });
            return;
          }

          try {
            const thumbnailId = await createThumbnail({
              images,
              title,
            });

            router.push(`/thumbnails/${thumbnailId}`);
          } catch (err) {
            toast({
              title: t('toastOutOfCreditsTitle'),
              description: (
                <div>
                  {t('toastOutOfCreditsDescriptionPart1')}
                  <UpgradeButton />
                  {t('toastOutOfCreditsDescriptionPart2')}
                </div>
              ),
              variant: "destructive",
            });
          }
        }}
      >
        <div className="flex flex-col gap-4 mb-8">
          <Label htmlFor="title">{t('youtubeTitleLabel')}</Label>
          <Input
            id="title"
            type="text"
            name="title"
            placeholder={t('youtubeTitlePlaceholder')}
            className={clsx({
              border: errors.title,
              "border-red-500": errors.title,
            })}
          />
          {errors.title && <div className="text-red-500">{errors.title}</div>}
        </div>

        <div className="grid grid-cols-3 gap-8 mb-8">
          {images.map((imageUrl, idx) => {
            return (
              <div key={imageUrl} className="flex flex-col relative">
                <div>{t('imageLabel')} {idx + 1}</div>
                <Button
                  size={"sm"}
                  variant="destructive"
                  className="absolute top-0 right-0 z-10"
                  onClick={() => {
                    setImages((imgs) => imgs.filter((img) => img !== imageUrl));
                  }}
                >
                  <XIcon className="w-4 h-4 mr-1" />
                </Button>
                <div className="relative aspect-[1280/720]">
                  <ConvexImage imageId={imageUrl} />
                </div>
              </div>
            );
          })}

          <div className="flex flex-col gap-4 mb-8 justify-center items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md aspect-[1280/720]">
            <Label htmlFor="upload-button">
              {images.length > 0 ? t('anotherLabel') : ""}{t('thumbnailImagesLabel')}
            </Label>
            <UploadButton
              className={(combinedState) => {
                return cn(buttonVariants());
              }}
              content={(progress) =>
                progress === null || progress === 0
                  ? t('uploadChooseFiles')
                  : t('uploadUploading')
              }
              uploadUrl={generateUploadUrl}
              fileTypes={["image/*"]}
              multiple
              onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                setImages((imgs) => [
                  ...imgs,
                  ...uploaded.map((file) => {
                    return (file.response as any).storageId as Id<"_storage">;
                  }),
                ]);
              }}
              onUploadError={(error: unknown) => {
                alert(`${t('uploadErrorPrefix')}${error}`);
              }}
            />
            {errors.images && (
              <div className="text-red-500">{errors.images}</div>
            )}
          </div>
        </div>

        <Button type="submit">{t('uploadSubmitButton')}</Button>
      </form>
    </div>
  );
}
