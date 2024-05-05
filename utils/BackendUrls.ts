import {
  encodeObjectToURLSearchParams,
  type DossierClientOperationName,
  type JsonDossierClientOperationArgs,
  type JsonPublishedDossierClientOperationArgs,
  type PublishedDossierClientOperationName,
} from '@dossierhq/core';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const BackendUrls = {
  dossier: (
    operationName: (typeof DossierClientOperationName)[keyof typeof DossierClientOperationName],
    args?: JsonDossierClientOperationArgs,
  ): string =>
    `${baseUrl}/dossier/${operationName}?${encodeObjectToURLSearchParams(
      { args },
      { keepEmptyObjects: true },
    )}`,
  publishedDossier: (
    operationName: (typeof PublishedDossierClientOperationName)[keyof typeof PublishedDossierClientOperationName],
    args?: JsonPublishedDossierClientOperationArgs,
  ): string =>
    `${baseUrl}/published-dossier/${operationName}?${encodeObjectToURLSearchParams(
      { args },
      { keepEmptyObjects: true },
    )}`,
};
