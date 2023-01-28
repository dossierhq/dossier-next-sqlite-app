import type { AdminClientOperation, ClientContext, ErrorType, Result } from '@dossierhq/core';
import { convertJsonAdminClientResult, createBaseAdminClient } from '@dossierhq/core';
import { useCachingAdminMiddleware } from '@dossierhq/react-components';
import { useMemo } from 'react';
import { FRONTEND_LOGGER } from '../config/LoggingConfig';
import type { AppAdminClient } from '../types/SchemaTypes';
import { BackendUrls } from '../utils/BackendUrls';
import { fetchJsonResult } from '../utils/FetchUtils';

export function useAdminClient() {
  const cachingMiddleware = useCachingAdminMiddleware();

  return useMemo(() => {
    const context = { logger: FRONTEND_LOGGER };
    return createBaseAdminClient<ClientContext, AppAdminClient>({
      context,
      pipeline: [cachingMiddleware, terminatingAdminMiddleware],
    });
  }, [cachingMiddleware]);
}

async function terminatingAdminMiddleware(
  context: ClientContext,
  operation: AdminClientOperation
): Promise<void> {
  let result: Result<unknown, ErrorType>;
  if (operation.modifies) {
    result = await fetchJsonResult(context, BackendUrls.admin(operation.name), {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(operation.args),
    });
  } else {
    result = await fetchJsonResult(context, BackendUrls.admin(operation.name, operation.args));
  }
  operation.resolve(convertJsonAdminClientResult(operation.name, result));
}
