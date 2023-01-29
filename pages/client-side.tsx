import { useEffect, useState } from 'react';
import { EntitySampleDisplay } from '../components/EntitySampleDisplay/EntitySampleDisplay';
import { Navbar } from '../components/Navbar/Navbar';
import { usePublishedClient } from '../hooks/usePublishedClient';
import styles from '../styles/info-page.module.css';
import type { AppPublishedClient } from '../types/SchemaTypes';

export default function ClientSidePage(): JSX.Element {
  const publishedClient = usePublishedClient();
  const [sampleResult, setSampleResult] = useState<Awaited<
    ReturnType<AppPublishedClient['sampleEntities']>
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
        {sampleResult && sampleResult.isError() ? (
          <p className={styles.paragraph}>
            If running on a serverless platform (e.g. Netlify or Vercel), using SQLite is not
            supported for CSR.
          </p>
        ) : null}
      </section>
    </>
  );
}
