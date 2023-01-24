import { PublishedEntityDisplayScreen } from '@dossierhq/react-components';
import Head from 'next/head';
import { AppPublishedDossierProvider } from '../../contexts/AppPublishedDossierProvider';
import { useUrlSearchParams } from '../../hooks/useUrlSearchParams';
import { NewNavBar } from '../NewNavbar/NewNavbar';

export default function PublishedEntityDetailPage(): JSX.Element | null {
  const { onUrlSearchParamsChange, urlSearchParams } = useUrlSearchParams();

  return (
    <AppPublishedDossierProvider>
      <Head>
        <title>Published entities | {process.env.NEXT_PUBLIC_SITE_NAME}</title>
      </Head>
      <PublishedEntityDisplayScreen
        header={<NewNavBar current="published-entities" />}
        urlSearchParams={urlSearchParams}
        onUrlSearchParamsChange={onUrlSearchParamsChange}
      />
    </AppPublishedDossierProvider>
  );
}
