import type { ClientContext, DossierClientOperation, ErrorType, Result } from '@dossierhq/core';
import { convertJsonDossierClientResult, createBaseDossierClient } from '@dossierhq/core';
import { useCachingDossierMiddleware } from '@dossierhq/react-components';
import { useMemo } from 'react';
import { FRONTEND_LOGGER } from '../config/LoggingConfig';
import type { AppDossierClient } from '../types/SchemaTypes';
import { BackendUrls } from '../utils/BackendUrls';
import { fetchJsonResult } from '../utils/FetchUtils';

export function useDossierClient() {
  const cachingMiddleware = useCachingDossierMiddleware();

  return useMemo(() => {
    const context = { logger: FRONTEND_LOGGER };
    return createBaseDossierClient<ClientContext, AppDossierClient>({
      context,
      pipeline: [cachingMiddleware, terminatingDossierMiddleware],
    });
  }, [cachingMiddleware]);
}

async function terminatingDossierMiddleware(
  context: ClientContext,
  operation: DossierClientOperation,
): Promise<void> {
  let result: Result<unknown, ErrorType>;
  if (operation.modifies) {
    result = await fetchJsonResult(context, BackendUrls.dossier(operation.name), {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(operation.args),
    });
  } else {
    result = await fetchJsonResult(context, BackendUrls.dossier(operation.name, operation.args));
  }
  operation.resolve(convertJsonDossierClientResult(operation.name, result));
}
