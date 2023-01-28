import type { EntitySamplingPayload, ErrorType, Result } from '@dossierhq/core';
import { convertJsonPublishedClientResult, convertJsonResult } from '@dossierhq/core';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { EntitySampleDisplay } from '../components/EntitySampleDisplay/EntitySampleDisplay';
import { Navbar } from '../components/Navbar/Navbar';
import styles from '../styles/info-page.module.css';
import type { AllPublishedEntities } from '../types/SchemaTypes';
import { getPublishedClientForServerComponent } from '../utils/BackendServerUtils';

interface Props {
  sampleResultJson: string;
}

export default function StaticGenerationPage({ sampleResultJson }: Props): JSX.Element {
  const sampleResult = convertJsonPublishedClientResult(
    'sampleEntities',
    convertJsonResult(JSON.parse(sampleResultJson))
  ) as Result<EntitySamplingPayload<AllPublishedEntities>, ErrorType>;
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_NAME}</title>
      </Head>
      <Navbar current="ssg" />
      <section className={styles.container}>
        <h1 className={styles.header}>Using Dossier in Static Site Generation (SSG)</h1>
        <EntitySampleDisplay sampleResult={sampleResult} />
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async (_context) => {
  const publishedClient = await getPublishedClientForServerComponent();
  const sampleResult = await publishedClient.sampleEntities({}, { count: 5 });
  return { props: { sampleResultJson: JSON.stringify(sampleResult) } };
};
