import type { Entity } from '@dossierhq/core';
import { ContentListScreen } from '@dossierhq/react-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { AppDossierProvider } from '../../contexts/AppDossierProvider';
import { useUrlSearchParams } from '../../hooks/useUrlSearchParams';
import { FrontendUrls } from '../../utils/FrontendUrls';
import { DossierWebInterfacePage } from '../DossierWebInterfacePage/DossierWebInterfacePage';
import { Navbar } from '../Navbar/Navbar';

export default function ContentListPage(): JSX.Element | null {
  const router = useRouter();
  const { onUrlSearchParamsChange, urlSearchParams } = useUrlSearchParams();

  const handleCreateEntity = useCallback(
    (type: string) => router.push(FrontendUrls.contentEditNew(type, crypto.randomUUID())),
    [router],
  );
  const handleEntityOpen = useCallback(
    (entity: Entity) => router.push(FrontendUrls.contentEdit([entity.id])),
    [router],
  );

  return (
    <DossierWebInterfacePage>
      <AppDossierProvider>
        <Head>
          <title>Content | {process.env.NEXT_PUBLIC_SITE_NAME}</title>
        </Head>
        <ContentListScreen
          header={<Navbar current="content" />}
          urlSearchParams={urlSearchParams}
          onUrlSearchParamsChange={onUrlSearchParamsChange}
          onCreateEntity={handleCreateEntity}
          onOpenEntity={handleEntityOpen}
        />
      </AppDossierProvider>
    </DossierWebInterfacePage>
  );
}
