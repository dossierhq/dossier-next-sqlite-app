import type { ErrorType, JsonPublishedDossierClientOperationArgs, Result } from '@dossierhq/core';
import {
  decodeURLSearchParamsParam,
  executeJsonPublishedDossierClientOperation,
  notOk,
  ok,
} from '@dossierhq/core';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSessionContextForRequest } from '../../../utils/BackendServerUtils';
import { handleRequest, sendMethodNotAllowedError } from '../../../utils/HandlerUtils';
import { getServerConnection } from '../../../utils/ServerUtils';

export default async function publishedOperationHandler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method === 'GET') {
    await handleRequest(res, async () => {
      return executePublishedOperation(req);
    });
  } else {
    sendMethodNotAllowedError(res, ['GET']);
  }
}

function getOperationArgs(
  req: NextApiRequest,
): Result<JsonPublishedDossierClientOperationArgs, typeof ErrorType.BadRequest> {
  const operationArgs = decodeURLSearchParamsParam<JsonPublishedDossierClientOperationArgs>(
    req.query,
    'args',
  );
  if (!operationArgs) {
    return notOk.BadRequest('Missing args');
  }
  return ok(operationArgs);
}

async function executePublishedOperation(req: NextApiRequest) {
  const { operationName } = req.query;
  if (typeof operationName !== 'string') return notOk.BadRequest('Operation name not provided');

  const operationResult = getOperationArgs(req);
  if (operationResult.isError()) return operationResult;

  const { server } = await getServerConnection();
  const authResult = await getSessionContextForRequest(server, req);
  if (authResult.isError()) return authResult;
  const { publishedClient } = authResult.value;

  const result = await executeJsonPublishedDossierClientOperation(
    publishedClient,
    operationName,
    operationResult.value,
  );
  return result;
}
