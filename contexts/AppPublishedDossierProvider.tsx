import type {
  FieldDisplayProps,
  PublishedDossierContextAdapter,
  RichTextComponentDisplayProps,
} from '@dossierhq/react-components';
import { PublishedDossierProvider } from '@dossierhq/react-components';
import { useMemo } from 'react';
import { DISPLAY_AUTH_KEYS } from '../config/AuthKeyConfig';
import { usePublishedClient } from '../hooks/usePublishedClient';

class PublishedContextAdapter implements PublishedDossierContextAdapter {
  renderPublishedFieldDisplay(_props: FieldDisplayProps): JSX.Element | null {
    return null;
  }

  renderPublishedRichTextComponentDisplay(
    _props: RichTextComponentDisplayProps,
  ): JSX.Element | null {
    return null;
  }
}

export function AppPublishedDossierProvider({ children }: { children: React.ReactNode }) {
  const publishedClient = usePublishedClient();
  const args = useMemo(
    () => ({
      publishedClient,
      adapter: new PublishedContextAdapter(),
      authKeys: DISPLAY_AUTH_KEYS,
    }),
    [publishedClient],
  );

  return <PublishedDossierProvider {...args}>{children}</PublishedDossierProvider>;
}
