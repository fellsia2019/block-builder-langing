import { redirect } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';

export default async function ReactIndexPage() {
  const locale = await getLocale();
  redirect({ href: '/docs/react/getting-started', locale });
}
