import type { PublishedEntity } from '@dossierhq/core';
import { PublishedEntityListScreen } from '@dossierhq/react-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { AppPublishedDossierProvider } from '../../contexts/AppPublishedDossierProvider';
import { useUrlSearchParams } from '../../hooks/useUrlSearchParams';
import { FrontendUrls } from '../../utils/FrontendUrls';
import { DossierWebInterfacePage } from '../DossierWebInterfacePage/DossierWebInterfacePage';
import { Navbar } from '../Navbar/Navbar';

export default function PublishedEntitiesListPage(): JSX.Element | null {
  const router = useRouter();
  const { onUrlSearchParamsChange, urlSearchParams } = useUrlSearchParams();

  const handleEntityOpen = useCallback(
    (entity: PublishedEntity) => router.push(FrontendUrls.publishedEntityDisplay([entity.id])),
    [router]
  );

  return (
    <DossierWebInterfacePage>
      <AppPublishedDossierProvider>
        <Head>
          <title>Published entities | {process.env.NEXT_PUBLIC_SITE_NAME}</title>
        </Head>
        <PublishedEntityListScreen
          header={<Navbar current="published-entities" />}
          urlSearchParams={urlSearchParams}
          onUrlSearchParamsChange={onUrlSearchParamsChange}
          onOpenEntity={handleEntityOpen}
        />
      </AppPublishedDossierProvider>
    </DossierWebInterfacePage>
  );
}
