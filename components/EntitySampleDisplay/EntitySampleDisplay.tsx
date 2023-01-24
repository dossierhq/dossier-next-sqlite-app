import type { EntitySamplingPayload, ErrorType, PublishedEntity, Result } from '@dossierhq/core';

interface Props {
  sampleResult: Result<EntitySamplingPayload<PublishedEntity>, ErrorType>;
}

export function EntitySampleDisplay({ sampleResult }: Props) {
  if (sampleResult.isError()) {
    return (
      <p>
        Failed fetching entities: {sampleResult.error}: {sampleResult.message}
      </p>
    );
  }

  return (
    <>
      <p>Total entity count: {sampleResult.value.totalCount}</p>
      {sampleResult.value.items.length > 0 ? (
        <ul>
          {sampleResult.value.items.map((entity) => (
            <li key={entity.id}>
              {entity.info.type}: {entity.info.name}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
