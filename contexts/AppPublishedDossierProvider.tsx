import type {
  FieldDisplayProps,
  PublishedDossierContextAdapter,
  RichTextComponentDisplayProps,
} from '@dossierhq/react-components';
import { PublishedDossierProvider } from '@dossierhq/react-components';
import { useMemo } from 'react';
import { usePublishedDossierClient } from '../hooks/usePublishedDossierClient';

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
  const publishedClient = usePublishedDossierClient();
  const args = useMemo(
    () => ({
      publishedClient,
      adapter: new PublishedContextAdapter(),
    }),
    [publishedClient],
  );

  return <PublishedDossierProvider {...args}>{children}</PublishedDossierProvider>;
}
