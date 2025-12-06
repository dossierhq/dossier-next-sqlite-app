import { SchemaEditorScreen } from '@dossierhq/react-components';
import Head from 'next/head';
import { useState } from 'react';
import { AppDossierProvider } from '../../contexts/AppDossierProvider';
import { useWarningOnExit } from '../../hooks/useWarningOnExit';
import { DossierWebInterfacePage } from '../DossierWebInterfacePage/DossierWebInterfacePage';
import { Navbar } from '../Navbar/Navbar';

export default function SchemaEditorPage() {
  const [hasChanges, setHasChanges] = useState(false);

  useWarningOnExit(
    'Changes to the schema will be lost, are you sure you want to leave the page?',
    hasChanges,
  );

  return (
    <DossierWebInterfacePage>
      <AppDossierProvider>
        <Head>
          <title>Schema | {process.env.NEXT_PUBLIC_SITE_NAME}</title>
        </Head>
        <SchemaEditorScreen
          header={<Navbar current="schema" />}
          onEditorHasChangesChange={setHasChanges}
        />
      </AppDossierProvider>
    </DossierWebInterfacePage>
  );
}
