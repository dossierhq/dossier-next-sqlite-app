import dynamic from 'next/dynamic';

const ChangelogPage = dynamic(
  () => import('../../components/ChangelogListPage/ChangelogListPage'),
  {
    ssr: false,
  },
);

export default function ChangelogPage_(): JSX.Element {
  return <ChangelogPage />;
}
