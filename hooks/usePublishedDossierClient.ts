import {
  convertJsonPublishedDossierClientResult,
  createBasePublishedDossierClient,
  type ClientContext,
  type PublishedDossierClientOperation,
} from '@dossierhq/core';
import { useMemo } from 'react';
import { FRONTEND_LOGGER } from '../config/LoggingConfig';
import type { AppPublishedDossierClient } from '../types/SchemaTypes';
import { BackendUrls } from '../utils/BackendUrls';
import { fetchJsonResult } from '../utils/FetchUtils';

export function usePublishedDossierClient() {
  return useMemo(() => {
    const context = { logger: FRONTEND_LOGGER };
    return createBasePublishedDossierClient<ClientContext, AppPublishedDossierClient>({
      context,
      pipeline: [terminatingPublishedMiddleware],
    });
  }, []);
}

async function terminatingPublishedMiddleware(
  context: ClientContext,
  operation: PublishedDossierClientOperation,
): Promise<void> {
  const result = await fetchJsonResult(
    context,
    BackendUrls.publishedDossier(operation.name, operation.args),
  );
  operation.resolve(convertJsonPublishedDossierClientResult(operation.name, result));
}
