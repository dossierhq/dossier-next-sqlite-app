import dynamic from 'next/dynamic';

const PublishedContentListPage = dynamic(
  () => import('../../../components/PublishedContentListPage/PublishedContentListPage'),
  { ssr: false },
);

export default function PublishedContentList(): JSX.Element {
  return <PublishedContentListPage />;
}
