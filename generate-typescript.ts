#!/usr/bin/env -S npx tsx
import { Schema } from '@dossierhq/core';
import type { Server } from '@dossierhq/server';
import { generateTypescriptForSchema } from '@dossierhq/typescript-generator';
import { execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { SYSTEM_USERS, getServerConnection } from './utils/ServerUtils.js';

async function generateTypes(schema: Schema, filename: string) {
  const publishedSchema = schema.toPublishedSchema();
  const sourceCode = generateTypescriptForSchema({ schema, publishedSchema });

  await writeFile(filename, sourceCode, { encoding: 'utf8' });
  execFileSync('npx', ['prettier', '-w', filename]);
}

async function getSchema(server: Server) {
  const initSession = server.createSession({
    ...SYSTEM_USERS.anonymous,
    logger: null,
    databasePerformance: null,
  });
  const client = server.createDossierClient(() => initSession);
  const schemaResult = await client.getSchemaSpecification();
  return new Schema(schemaResult.valueOrThrow());
}

async function main() {
  const { server } = await getServerConnection();
  try {
    const adminSchema = await getSchema(server);

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
