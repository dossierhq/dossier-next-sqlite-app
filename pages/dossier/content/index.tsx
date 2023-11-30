import dynamic from 'next/dynamic';

const ContentListPage = dynamic(
  () => import('../../../components/ContentListPage/ContentListPage'),
  { ssr: false },
);

export default function ContentList(): JSX.Element {
  return <ContentListPage />;
}
