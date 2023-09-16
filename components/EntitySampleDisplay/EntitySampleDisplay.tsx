import type { PublishedEntity } from '@dossierhq/core';
import type { AppPublishedClient } from '../../types/SchemaTypes';
import styles from './EntitySampleDisplay.module.css';

interface Props {
  sampleResult: Awaited<ReturnType<AppPublishedClient['getEntitiesSample']>>;
}

export function EntitySampleDisplay({ sampleResult }: Props) {
  if (sampleResult.isError()) {
    return (
      <p className={styles.paragraph}>
        Failed fetching entities: {sampleResult.error}: {sampleResult.message}
      </p>
    );
  }

  return (
    <>
      <p className={styles.paragraph}>
        Total entity count: {sampleResult.value.totalCount}
        {sampleResult.value.items.length > 0 ? (
          <>
            <br />
            {sampleResult.value.items.length} sample entities:
          </>
        ) : null}
      </p>
      {sampleResult.value.items.length > 0 ? (
        <ul className={styles.list}>
          {sampleResult.value.items.map((item) => {
            // This is only needed since we don't have any entity types in the main branch so the
            // type of item is 'never' on the main branch. Feel free to remove this cast when you've
            // added some entity types.
            const entity = item as unknown as PublishedEntity;
            return (
              <li key={entity.id}>
                Type: {entity.info.type}, id: {entity.id}, name: {entity.info.name}
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
