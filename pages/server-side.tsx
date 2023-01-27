import { convertJsonPublishedClientResult, convertJsonResult, notOk } from '@dossierhq/core';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { EntitySampleDisplay } from '../components/EntitySampleDisplay/EntitySampleDisplay';
import { Navbar } from '../components/Navbar/Navbar';
import { BACKEND_LOGGER } from '../config/LoggingConfig';
import styles from '../styles/info-page.module.css';
import { getPublishedClientForServerComponent } from '../utils/ServerComponentUtils';

interface Props {
  sampleResultJson: string;
  nextRuntime: string;
}

export default function ServerSidePage({ sampleResultJson, nextRuntime }: Props): JSX.Element {
  const sampleResult = convertJsonPublishedClientResult(
    'sampleEntities',
    convertJsonResult(JSON.parse(sampleResultJson))
  );
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_NAME}</title>
      </Head>
      <Navbar current="ssr" />
      <section className={styles.container}>
        <h1 className={styles.header}>Using Dossier in Server Side Rendering (SSR)</h1>
        <p>RUNTIME: {nextRuntime}</p>
        {sampleResult.isError() ? <p></p> : <EntitySampleDisplay sampleResult={sampleResult} />}
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
      sampleResultJson: JSON.stringify(sampleResult),
      nextRuntime: process.env.NEXT_RUNTIME ?? 'unknown',
    },
  };
};
