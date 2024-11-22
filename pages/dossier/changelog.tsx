import dynamic from 'next/dynamic';
import type { JSX } from 'react';

const ChangelogPage = dynamic(
  () => import('../../components/ChangelogListPage/ChangelogListPage'),
  { ssr: false },
);

export default function ChangelogPage_(): JSX.Element {
  return <ChangelogPage />;
}
