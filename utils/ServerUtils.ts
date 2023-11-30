import { createBetterSqlite3Adapter } from '@dossierhq/better-sqlite3';
import { createConsoleLogger, type Logger } from '@dossierhq/core';
import {
  BackgroundEntityProcessorPlugin,
  createServer,
  NoneAndSubjectAuthorizationAdapter,
  type AuthorizationAdapter,
  type Server,
} from '@dossierhq/server';
import Database from 'better-sqlite3';

const DEFAULT_AUTH_KEYS = ['none', 'subject'];

export const SYSTEM_USERS = {
  anonymous: {
    provider: 'sys',
    identifier: 'anonymous',
    defaultAuthKeys: DEFAULT_AUTH_KEYS,
  },
} as const;

let serverConnectionPromise: Promise<{ server: Server }> | null = null;
const logger = createConsoleLogger(console);

export async function getServerConnection(): Promise<{ server: Server }> {
  if (!serverConnectionPromise) {
    serverConnectionPromise = (async () => {
      const databaseAdapter = (await createDatabaseAdapter(logger)).valueOrThrow();

      const server = (
        await createServer({
          databaseAdapter,
          authorizationAdapter: createAuthenticationAdapter(),
          logger,
        })
      ).valueOrThrow();

      const plugin = new BackgroundEntityProcessorPlugin(server, logger);
      server.addPlugin(plugin);
      plugin.start();

      return { server };
    })();
  }

  return serverConnectionPromise;
}

async function createDatabaseAdapter(logger: Logger) {
  const context = { logger };
  const filename = process.env.SQLITE_FILE ?? 'data/database.sqlite';
  const readonly = process.env.SQLITE_READONLY === 'true';
  logger.info(`Using database file: ${filename}${readonly ? ' (read-only)' : ''}`);
  const database = new Database(filename, { readonly });

  const databaseAdapterResult = await createBetterSqlite3Adapter(context, database, {
    migrate: !readonly,
    fts: { version: 'fts5' },
    journalMode: 'wal',
  });
  return databaseAdapterResult;
}

function createAuthenticationAdapter(): AuthorizationAdapter {
  return NoneAndSubjectAuthorizationAdapter;
}
