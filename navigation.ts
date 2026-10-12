import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { langCodes } from './libs/locales';

export const locales = langCodes;
export const localePrefix = 'as-needed';

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });