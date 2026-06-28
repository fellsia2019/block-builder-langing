import { redirect } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';

export default async function DocsIndexPage() {
  const locale = await getLocale();
  redirect({ href: '/docs/get-started', locale });
}
