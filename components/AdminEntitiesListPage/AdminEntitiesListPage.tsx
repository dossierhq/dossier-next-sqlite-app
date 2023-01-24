import type { AdminEntity } from '@dossierhq/core';
import { AdminEntityListScreen } from '@dossierhq/react-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { AppAdminDossierProvider } from '../../contexts/AppAdminDossierProvider';
import { useUrlSearchParams } from '../../hooks/useUrlSearchParams';
import { FrontendUrls } from '../../utils/FrontendUrls';
import { NewNavBar } from '../NewNavbar/NewNavbar';

export default function AdminEntitiesListPage(): JSX.Element | null {
  const router = useRouter();
  const { onUrlSearchParamsChange, urlSearchParams } = useUrlSearchParams();

  const handleCreateEntity = useCallback(
    (type: string) => router.push(FrontendUrls.editPageNew(type, crypto.randomUUID())),
    [router]
  );
  const handleEntityOpen = useCallback(
    (entity: AdminEntity) => router.push(FrontendUrls.editPage([entity.id])),
    [router]
  );

  return (
    <AppAdminDossierProvider>
      <Head>
        <title>Entities | {process.env.NEXT_PUBLIC_SITE_NAME}</title>
      </Head>
      <AdminEntityListScreen
        header={<NewNavBar current="admin-entities" />}
        urlSearchParams={urlSearchParams}
        onUrlSearchParamsChange={onUrlSearchParamsChange}
        onCreateEntity={handleCreateEntity}
        onOpenEntity={handleEntityOpen}
      />
    </AppAdminDossierProvider>
  );
}
