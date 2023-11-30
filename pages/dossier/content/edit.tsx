import dynamic from 'next/dynamic';

const ContentEditPage = dynamic(
  () => import('../../../components/ContentEditorPage/ContentEditorPage'),
  { ssr: false },
);

export default function ContentEdit(): JSX.Element | null {
  return <ContentEditPage />;
}
