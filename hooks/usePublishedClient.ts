import type { ClientContext, PublishedClientOperation } from '@dossierhq/core';
import { convertJsonPublishedClientResult, createBasePublishedClient } from '@dossierhq/core';
import { useMemo } from 'react';
import { FRONTEND_LOGGER } from '../config/LoggingConfig';
import type { AppPublishedClient } from '../types/SchemaTypes';
import { BackendUrls } from '../utils/BackendUrls';
import { fetchJsonResult } from '../utils/FetchUtils';

export function usePublishedClient() {
  return useMemo(() => {
    const context = { logger: FRONTEND_LOGGER };
    return createBasePublishedClient<ClientContext, AppPublishedClient>({
      context,
      pipeline: [terminatingPublishedMiddleware],
    });
  }, []);
}

async function terminatingPublishedMiddleware(
  context: ClientContext,
  operation: PublishedClientOperation,
): Promise<void> {
  const result = await fetchJsonResult(
    context,
    BackendUrls.published(operation.name, operation.args),
  );
  operation.resolve(convertJsonPublishedClientResult(operation.name, result));
}
