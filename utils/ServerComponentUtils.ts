import type { PublishedClient } from '@dossierhq/core';
import { SYSTEM_USERS } from '../config/SystemUsers';
import { getServerConnection } from './ServerUtils';

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
