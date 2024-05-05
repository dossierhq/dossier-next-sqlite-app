import type {
  DossierContextAdapter,
  FieldEditorProps,
  RichTextComponentEditorProps,
} from '@dossierhq/react-components';
import { DossierProvider } from '@dossierhq/react-components';
import { useMemo } from 'react';
import { useDossierClient } from '../hooks/useDossierClient';

class AppContextAdapter implements DossierContextAdapter {
  renderFieldEditor(_props: FieldEditorProps): JSX.Element | null {
    return null;
  }

  renderRichTextComponentEditor(_props: RichTextComponentEditorProps): JSX.Element | null {
    return null;
  }
}

export function AppDossierProvider({ children }: { children: React.ReactNode }) {
  const client = useDossierClient();

  const args = useMemo(
    () => ({
      client,
      adapter: new AppContextAdapter(),
    }),
    [client],
  );

  return (
    <DossierProvider {...args} client={client}>
      {children}
    </DossierProvider>
  );
}
