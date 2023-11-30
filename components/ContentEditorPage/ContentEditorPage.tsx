import { ContentEditorScreen } from '@dossierhq/react-components';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import { AppAdminDossierProvider } from '../../contexts/AppAdminDossierProvider';
import { useUrlSearchParams } from '../../hooks/useUrlSearchParams';
import { useWarningOnExit } from '../../hooks/useWarningOnExit';
import { FrontendUrls } from '../../utils/FrontendUrls';
import { DossierWebInterfacePage } from '../DossierWebInterfacePage/DossierWebInterfacePage';
import { Navbar } from '../Navbar/Navbar';

export default function ContentEditorPage(): JSX.Element {
  const { onUrlSearchParamsChange, urlSearchParams } = useUrlSearchParams();
  const [hasChanges, setHasChanges] = useState(false);

  const shouldWarn = useMemo(() => {
    if (!hasChanges) return false;
    return (_fromUrl: string, toUrl: string) => {
      return !FrontendUrls.isContentEdit(toUrl);
    };
  }, [hasChanges]);

  useWarningOnExit('Changes will be lost, are you sure you want to leave the page?', shouldWarn);

  return (
    <DossierWebInterfacePage>
      <AppAdminDossierProvider>
        <Head>
          <title>Edit content | {process.env.NEXT_PUBLIC_SITE_NAME}</title>
        </Head>
        <ContentEditorScreen
          header={<Navbar current="content" />}
          urlSearchParams={urlSearchParams}
          onUrlSearchParamsChange={onUrlSearchParamsChange}
          onEditorHasChangesChange={setHasChanges}
        />
      </AppAdminDossierProvider>
    </DossierWebInterfacePage>
  );
}
