import type { EntitySamplingPayload, ErrorType, Result } from '@dossierhq/core';
import { convertJsonPublishedClientResult, convertJsonResult, notOk } from '@dossierhq/core';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { EntitySampleDisplay } from '../components/EntitySampleDisplay/EntitySampleDisplay';
import { Navbar } from '../components/Navbar/Navbar';
import { BACKEND_LOGGER } from '../config/LoggingConfig';
import styles from '../styles/info-page.module.css';
import type { AllPublishedEntities } from '../types/SchemaTypes';
import { getPublishedClientForServerComponent } from '../utils/BackendServerUtils';

interface Props {
  sampleResultJson: string;
}

export default function ServerSidePage({ sampleResultJson }: Props): JSX.Element {
  const sampleResult = convertJsonPublishedClientResult(
    'sampleEntities',
    convertJsonResult(JSON.parse(sampleResultJson))
  ) as Result<EntitySamplingPayload<AllPublishedEntities>, ErrorType>;
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_NAME}</title>
      </Head>
      <Navbar current="ssr" />
      <section className={styles.container}>
        <h1 className={styles.header}>Using Dossier in Server Side Rendering (SSR)</h1>
        <EntitySampleDisplay sampleResult={sampleResult} />
        {sampleResult.isError() ? (
          <p className={styles.paragraph}>
            If running on a serverless platform (e.g. Netlify or Vercel), using SQLite is not
            supported for SSR.
          </p>
        ) : null}
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (_context) => {
  let sampleResult;
  try {
    const publishedClient = await getPublishedClientForServerComponent();
    sampleResult = await publishedClient.sampleEntities({}, { count: 5 });
  } catch (error) {
    sampleResult = notOk.GenericUnexpectedException({ logger: BACKEND_LOGGER }, error);
  }
  return {
    props: {
      // Page props have to be JSON serializable for Next.js, so we convert the result to JSON ourselves.
      sampleResultJson: JSON.stringify(sampleResult),
    },
  };
};
