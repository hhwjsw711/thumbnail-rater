import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useLanguage } from "@/lib/i18n/language-context";
import { useToast } from "@/components/ui/use-toast";
import useMediaQuery from "@/hooks/use-media-query";

type FeedbackFormProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type FeedbackProps = {
  triggerContent: React.ReactNode;
};

export default function Feedback({ triggerContent }: FeedbackProps) {
  const { t } = useLanguage();

  const [open, setOpen] = React.useState(false);

  const { isMobile } = useMediaQuery();

  const description = t('feedbackDescription');


  const feedbackSchema = z.object({
    name: z.string().min(2, {
      message: t('nameIsRequired'),
    }),
    feedback: z.string().min(1, { message: t('feedbackIsRequired') }),
  });

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{triggerContent}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{t('feedback')}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <FeedbackForm
            setOpen={setOpen}
            feedbackSchema={feedbackSchema}
          />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">{t('cancel')}</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('feedback')}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <FeedbackForm
          setOpen={setOpen}
          feedbackSchema={feedbackSchema}
        />
      </DialogContent>
    </Dialog>
  );
}

export function FeedbackForm({
  setOpen,
  feedbackSchema
}: FeedbackFormProps & { feedbackSchema: any }) {
  const { t } = useLanguage();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      feedback: "",
    },
  });
  const { toast } = useToast();
  const onSubmit = async (values: z.infer<typeof feedbackSchema>) => {
    try {
      await fetch("https://projectplannerai.com/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          feedback: values.feedback,
          projectId: "j574r3qbsnz6gm7grh67de1f5s7fvzcm",
        }),
      });
      setOpen(false);
      toast({
        title: t('feedbackSubmitted'),
        description: t('thankYouForYourFeedback'),
      });
    } catch (error) {
      console.error("Failed to send feedback:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("grid items-start gap-4 px-4 sm:px-0")}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">
          {t('yourName')} <span className="text-red-600">*</span>
        </Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input {...field} type="name" id="name" placeholder={t('namePlaceholder')} />
          )}
        />
        {errors.name && typeof errors.name.message === "string" && (
          <p className="text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="feedback">
          {t('yourFeedback')} <span className="text-red-600">*</span>
        </Label>
        <Controller
          name="feedback"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className="w-full h-32 text-sm border rounded-lg flex border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={t('feedbackPlaceholder')}
            />
          )}
        />
        {errors.feedback && typeof errors.feedback.message === "string" && (
          <p className="text-red-600">{errors.feedback.message}</p>
        )}
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('sendingFeedback')}
            </>
          ) : (
            t('sendFeedback')
          )}
        </Button>
      </div>
    </form>
  );
}
