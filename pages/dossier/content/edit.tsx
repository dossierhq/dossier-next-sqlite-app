import dynamic from 'next/dynamic';

const ContentEditPage = dynamic(
  () => import('../../../components/ContentEditPage/ContentEditPage'),
  { ssr: false },
);

export default function ContentEdit(): JSX.Element | null {
  return <ContentEditPage />;
}
