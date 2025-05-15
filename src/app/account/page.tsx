"use client";

import React, { useEffect, useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/language-context";

export default function AccountPage() {
  const { t } = useLanguage();

  const formSchema = useMemo(() => z.object({
    name: z.string().min(2, {
      message: t("accountDisplayNameErrorMessage"),
    }),
  }), [t]);

  const { isAuthenticated, isLoading: isAuthLoading } = useSession();
  const user = useQuery(
    api.users.getMyUser,
    isAuthLoading || !isAuthenticated ? "skip" : undefined
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  const updateMyUser = useMutation(api.users.updateMyUser);

  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;
    form.setValue("name", user.name ?? "");
  }, [user, form]);

  return (
    <div className="mb-12">
      <h2 className="text-4xl font-bold mb-8">{t('accountPageTitle')}</h2>

      <Form {...form}>
      <form
          className="max-w-sm"
          onSubmit={form.handleSubmit(async (values) => {
            try {
              await updateMyUser({
                name: values.name,
              });
              toast({
                title: t('accountUpdateSuccessTitle'),
                description: t('accountUpdateSuccessDescription'),
                variant: "default",
              });
            } catch (error) {
              toast({
                title: t('accountUpdateErrorTitle'),
                description: t('accountUpdateErrorDescription'),
                variant: "destructive",
              });
            }
          })}
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel className="flex flex-row space-x-1 items-center">
                  {t('accountDisplayNameLabel')}
                </FormLabel>
                <div className="flex items-center gap-4 mt-2 max-w-lg">
                  <FormControl>
                    <Input {...field} type="text" required />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button className="w-fit mt-4" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('accountSavingButton')}
                </>
              ) : (
                t('accountSaveButton')
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
