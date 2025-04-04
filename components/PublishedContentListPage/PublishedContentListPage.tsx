import type { PublishedEntity } from '@dossierhq/core';
import { PublishedContentListScreen } from '@dossierhq/react-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, type JSX } from 'react';
import { AppPublishedDossierProvider } from '../../contexts/AppPublishedDossierProvider';
import { useUrlSearchParams } from '../../hooks/useUrlSearchParams';
import { FrontendUrls } from '../../utils/FrontendUrls';
import { DossierWebInterfacePage } from '../DossierWebInterfacePage/DossierWebInterfacePage';
import { Navbar } from '../Navbar/Navbar';

export default function PublishedContentListPage(): JSX.Element | null {
  const router = useRouter();
  const { onUrlSearchParamsChange, urlSearchParams } = useUrlSearchParams();

  const handleEntityOpen = useCallback(
    (entity: PublishedEntity) => router.push(FrontendUrls.publishedContentDisplay([entity.id])),
    [router],
  );

  return (
    <DossierWebInterfacePage>
      <AppPublishedDossierProvider>
        <Head>
          <title>Published content | {process.env.NEXT_PUBLIC_SITE_NAME}</title>
        </Head>
        <PublishedContentListScreen
          header={<Navbar current="published-content" />}
          urlSearchParams={urlSearchParams}
          onUrlSearchParamsChange={onUrlSearchParamsChange}
          onOpenEntity={handleEntityOpen}
        />
      </AppPublishedDossierProvider>
    </DossierWebInterfacePage>
  );
}
