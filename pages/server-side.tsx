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
}

export default function ServerSidePage({ sampleResultJson }: Props): JSX.Element {
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
        <EntitySampleDisplay sampleResult={sampleResult} />
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (_context) => {
  try {
    const publishedClient = await getPublishedClientForServerComponent();
    const sampleResult = await publishedClient.sampleEntities({}, { count: 5 });
    return { props: { sampleResultJson: JSON.stringify(sampleResult) } };
  } catch (error) {
    return {
      props: {
        sampleResultJson: JSON.stringify(
          notOk.GenericUnexpectedException({ logger: BACKEND_LOGGER }, error)
        ),
      },
    };
  }
};
