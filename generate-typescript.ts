#!/usr/bin/env -S npx tsx
import { AdminSchema } from '@dossierhq/core';
import type { Server } from '@dossierhq/server';
import { generateTypescriptForSchema } from '@dossierhq/typescript-generator';
import { execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { getServerConnection, SYSTEM_USERS } from './utils/ServerUtils.js';

async function generateTypes(adminSchema: AdminSchema, filename: string) {
  const publishedSchema = adminSchema.toPublishedSchema();
  const sourceCode = generateTypescriptForSchema({ adminSchema, publishedSchema });

  await writeFile(filename, sourceCode, { encoding: 'utf8' });
  execFileSync('npx', ['prettier', '-w', filename]);
}

async function getAdminSchema(server: Server) {
  const initSession = server.createSession({
    ...SYSTEM_USERS.anonymous,
    logger: null,
    databasePerformance: null,
  });
  const adminClient = server.createAdminClient(() => initSession);
  const schemaResult = await adminClient.getSchemaSpecification();
  return new AdminSchema(schemaResult.valueOrThrow());
}

async function main() {
  const { server } = await getServerConnection();
  try {
    const adminSchema = await getAdminSchema(server);

    await mkdir('./types', { recursive: true });
    await generateTypes(adminSchema, './types/SchemaTypes.ts');
  } finally {
    await server.shutdown();
  }
}

main().catch((error) => {
  console.warn(error);
  process.exitCode = 1;
});
