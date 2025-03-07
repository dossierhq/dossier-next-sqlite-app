import { PublishedContentDisplayScreen } from '@dossierhq/react-components';
import Head from 'next/head';
import type { JSX } from 'react';
import { AppPublishedDossierProvider } from '../../contexts/AppPublishedDossierProvider';
import { useUrlSearchParams } from '../../hooks/useUrlSearchParams';
import { DossierWebInterfacePage } from '../DossierWebInterfacePage/DossierWebInterfacePage';
import { Navbar } from '../Navbar/Navbar';

export default function PublishedContentDetailPage(): JSX.Element | null {
  const { onUrlSearchParamsChange, urlSearchParams } = useUrlSearchParams();

  return (
    <DossierWebInterfacePage>
      <AppPublishedDossierProvider>
        <Head>
          <title>Published content | {process.env.NEXT_PUBLIC_SITE_NAME}</title>
        </Head>
        <PublishedContentDisplayScreen
          header={<Navbar current="published-content" />}
          urlSearchParams={urlSearchParams}
          onUrlSearchParamsChange={onUrlSearchParamsChange}
        />
      </AppPublishedDossierProvider>
    </DossierWebInterfacePage>
  );
}
