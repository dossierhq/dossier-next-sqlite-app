import type { EntitySamplingPayload, ErrorType, PublishedEntity, Result } from '@dossierhq/core';
import { useEffect, useState } from 'react';
import { EntitySampleDisplay } from '../components/EntitySampleDisplay/EntitySampleDisplay';
import { Navbar } from '../components/Navbar/Navbar';
import { usePublishedClient } from '../hooks/usePublishedClient';
import styles from '../styles/info-page.module.css';

export default function ClientSidePage(): JSX.Element {
  const publishedClient = usePublishedClient();
  const [sampleResult, setSampleResult] = useState<Result<
    EntitySamplingPayload<PublishedEntity>,
    ErrorType
  > | null>(null);

  useEffect(() => {
    publishedClient.sampleEntities({}, { count: 5 }).then(setSampleResult);
  }, [publishedClient]);

  return (
    <>
      <Navbar current="csr" />
      <section className={styles.container}>
        <h1 className={styles.header}>Using Dossier in Client Side Rendering (CSR)</h1>
        {sampleResult && <EntitySampleDisplay sampleResult={sampleResult} />}
      </section>
    </>
  );
}
