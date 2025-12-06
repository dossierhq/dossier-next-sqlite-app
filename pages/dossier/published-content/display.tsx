import dynamic from 'next/dynamic';
import type { JSX } from 'react';

const PublishedContentDisplayPage = dynamic(
  () => import('../../../components/PublishedContentDisplayPage/PublishedContentDisplayPage'),
  { ssr: false },
);

export default function PublishedContent(): JSX.Element {
  return <PublishedContentDisplayPage />;
}
