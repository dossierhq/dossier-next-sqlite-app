import type { ErrorType, PromiseResult } from '@dossierhq/core';
import { notOk, ok } from '@dossierhq/core';
import type { Server } from '@dossierhq/server';
import type { NextApiRequest } from 'next';
import type { AppDossierClient, AppPublishedDossierClient } from '../types/SchemaTypes';
import { getServerConnection, SYSTEM_USERS } from './ServerUtils';

let publishedClientPromise: Promise<AppPublishedDossierClient> | null = null;

export function getPublishedClientForServerComponent(): Promise<AppPublishedDossierClient> {
  if (!publishedClientPromise) {
    publishedClientPromise = (async () => {
      const { server } = await getServerConnection();
      const authResult = await server.createSession({
        ...SYSTEM_USERS.anonymous,
        logger: null,
        databasePerformance: null,
      });
      return server.createPublishedClient<AppPublishedDossierClient>(
        authResult.valueOrThrow().context,
      );
    })();
  }
  return publishedClientPromise;
}

export async function getSessionContextForRequest(
  server: Server,
  req: NextApiRequest,
): PromiseResult<
  { adminClient: AppDossierClient; publishedClient: AppPublishedDossierClient },
  typeof ErrorType.NotAuthenticated
> {
  //TODO actually authenticate, currently just using anonymous for everything
  const sessionResult = await server.createSession({
    ...SYSTEM_USERS.anonymous,
    logger: null,
    databasePerformance: null,
  });
  if (sessionResult.isError()) {
    return notOk.NotAuthenticated(
      `Failed authentication: ${sessionResult.error}: ${sessionResult.message}`,
    );
  }
  const { context } = sessionResult.value;
  const adminClient = server.createDossierClient<AppDossierClient>(context);
  const publishedClient = server.createPublishedClient<AppPublishedDossierClient>(context);
  return ok({ adminClient, publishedClient });
}
