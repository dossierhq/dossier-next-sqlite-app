import dynamic from 'next/dynamic';
import type { JSX } from 'react';

const ContentEditPage = dynamic(
  () => import('../../../components/ContentEditorPage/ContentEditorPage'),
  { ssr: false },
);

export default function ContentEdit(): JSX.Element | null {
  return <ContentEditPage />;
}
