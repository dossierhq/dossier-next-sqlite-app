import type {
  AdminDossierContextAdapter,
  FieldEditorProps,
  RichTextComponentEditorProps,
} from '@dossierhq/react-components';
import { AdminDossierProvider } from '@dossierhq/react-components';
import { useMemo } from 'react';
import { DISPLAY_AUTH_KEYS } from '../config/AuthKeyConfig';
import { useAdminClient } from '../hooks/useAdminClient';

class AdminContextAdapter implements AdminDossierContextAdapter {
  renderAdminFieldEditor(_props: FieldEditorProps): JSX.Element | null {
    return null;
  }

  renderAdminRichTextComponentEditor(_props: RichTextComponentEditorProps): JSX.Element | null {
    return null;
  }
}

export function AppAdminDossierProvider({ children }: { children: React.ReactNode }) {
  const adminClient = useAdminClient();

  const args = useMemo(
    () => ({
      adminClient,
      adapter: new AdminContextAdapter(),
      authKeys: DISPLAY_AUTH_KEYS,
    }),
    [adminClient],
  );

  return (
    <AdminDossierProvider {...args} adminClient={adminClient}>
      {children}
    </AdminDossierProvider>
  );
}
