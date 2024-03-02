import { Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'de', 'fr', 'ja', 'ko', 'zh'] as const;

export const pathnames = {
  '/': '/',
  '/dashboard': '/dashboard',
  '/create': '/create',
  '/explore': '/explore',
  '/pricing': '/',
  '/about': '/',
  '/thumbnails/:id': '/thumbnails/'
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
