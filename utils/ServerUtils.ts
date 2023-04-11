import type { Logger } from '@dossierhq/core';
import { createConsoleLogger } from '@dossierhq/core';
import type { AuthorizationAdapter, Server } from '@dossierhq/server';
import {
  BackgroundEntityValidatorPlugin,
  NoneAndSubjectAuthorizationAdapter,
  createServer,
} from '@dossierhq/server';
import { createDatabase, createSqlite3Adapter } from '@dossierhq/sqlite3';
import * as Sqlite from 'sqlite3';
import { OPEN_READONLY } from 'sqlite3';

// TODO @types/sqlite is slightly wrong in terms of CommonJS/ESM export
const { Database: SqliteDatabase } = (Sqlite as unknown as { default: typeof Sqlite }).default;

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

      const validationPlugin = new BackgroundEntityValidatorPlugin(server, logger);
      server.addPlugin(validationPlugin);
      validationPlugin.start();

      return { server };
    })();
  }

  return serverConnectionPromise;
}

async function createDatabaseAdapter(logger: Logger) {
  const context = { logger };
  const filename = process.env.SQLITE_FILE ?? 'data/database.sqlite';
  const readOnly = process.env.SQLITE_READONLY === 'true';
  logger.info(`Using database file: ${filename}${readOnly ? ' (read-only)' : ''}`);
  const databaseResult = await createDatabase(context, SqliteDatabase, {
    filename,
    mode: readOnly ? OPEN_READONLY : undefined,
  });
  if (databaseResult.isError()) return databaseResult;

  const databaseAdapterResult = await createSqlite3Adapter(context, databaseResult.value, {
    migrate: !readOnly,
    fts: { version: 'fts5' },
    journalMode: 'wal',
  });
  return databaseAdapterResult;
}

function createAuthenticationAdapter(): AuthorizationAdapter {
  return NoneAndSubjectAuthorizationAdapter;
}
