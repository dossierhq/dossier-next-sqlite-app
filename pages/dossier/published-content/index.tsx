import dynamic from 'next/dynamic';
import type { JSX } from 'react';

const PublishedContentListPage = dynamic(
  () => import('../../../components/PublishedContentListPage/PublishedContentListPage'),
  { ssr: false },
);

export default function PublishedContentList(): JSX.Element {
  return <PublishedContentListPage />;
}
