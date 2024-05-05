import type {
  DossierContextAdapter,
  FieldEditorProps,
  RichTextComponentEditorProps,
} from '@dossierhq/react-components';
import { DossierProvider } from '@dossierhq/react-components';
import { useMemo } from 'react';
import { useAdminClient } from '../hooks/useAdminClient';

class AdminContextAdapter implements DossierContextAdapter {
  renderFieldEditor(_props: FieldEditorProps): JSX.Element | null {
    return null;
  }

  renderRichTextComponentEditor(_props: RichTextComponentEditorProps): JSX.Element | null {
    return null;
  }
}

export function AppAdminDossierProvider({ children }: { children: React.ReactNode }) {
  const client = useAdminClient();

  const args = useMemo(
    () => ({
      client,
      adapter: new AdminContextAdapter(),
    }),
    [client],
  );

  return (
    <DossierProvider {...args} client={client}>
      {children}
    </DossierProvider>
  );
}
