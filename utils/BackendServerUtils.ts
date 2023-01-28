import type { ErrorType, PromiseResult, PublishedClient } from '@dossierhq/core';
import { notOk, ok } from '@dossierhq/core';
import type { Server } from '@dossierhq/server';
import type { NextApiRequest } from 'next';
import type { AppAdminClient, AppPublishedClient } from '../types/SchemaTypes';
import { getServerConnection, SYSTEM_USERS } from './ServerUtils';

let publishedClientPromise: Promise<PublishedClient> | null = null;

export function getPublishedClientForServerComponent(): Promise<PublishedClient> {
  if (!publishedClientPromise) {
    publishedClientPromise = (async () => {
      const { server } = await getServerConnection();
      const authResult = await server.createSession(SYSTEM_USERS.anonymous);
      return server.createPublishedClient<PublishedClient>(authResult.valueOrThrow().context);
    })();
  }
  return publishedClientPromise;
}

export async function getSessionContextForRequest(
  server: Server,
  req: NextApiRequest
): PromiseResult<
  { adminClient: AppAdminClient; publishedClient: AppPublishedClient },
  typeof ErrorType.NotAuthenticated
> {
  //TODO actually authenticate, currently just using anonymous for everything
  const sessionResult = await server.createSession(SYSTEM_USERS.anonymous);
  if (sessionResult.isError()) {
    return notOk.NotAuthenticated(
      `Failed authentication: ${sessionResult.error}: ${sessionResult.message}`
    );
  }
  const { context } = sessionResult.value;
  const adminClient = server.createAdminClient<AppAdminClient>(context);
  const publishedClient = server.createPublishedClient<AppPublishedClient>(context);
  return ok({ adminClient, publishedClient });
}
