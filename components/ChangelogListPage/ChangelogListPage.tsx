import { ChangelogListScreen } from '@dossierhq/react-components';
import Head from 'next/head';
import { AppDossierProvider } from '../../contexts/AppDossierProvider';
import { useUrlSearchParams } from '../../hooks/useUrlSearchParams';
import { DossierWebInterfacePage } from '../DossierWebInterfacePage/DossierWebInterfacePage';
import { Navbar } from '../Navbar/Navbar';

export default function ChangelogListPage() {
  const { onUrlSearchParamsChange, urlSearchParams } = useUrlSearchParams();

  return (
    <DossierWebInterfacePage>
      <AppDossierProvider>
        <Head>
          <title>Changelog | {process.env.NEXT_PUBLIC_SITE_NAME}</title>
        </Head>
        <ChangelogListScreen
          header={<Navbar current="changelog" />}
          urlSearchParams={urlSearchParams}
          onUrlSearchParamsChange={onUrlSearchParamsChange}
        />
      </AppDossierProvider>
    </DossierWebInterfacePage>
  );
}
