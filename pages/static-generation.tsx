import { convertJsonPublishedClientResult, convertJsonResult } from '@dossierhq/core';
import { FullscreenContainer } from '@dossierhq/design';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { EntitySampleDisplay } from '../components/EntitySampleDisplay/EntitySampleDisplay';
import { NavBar } from '../components/NavBar/NavBar';
import { getPublishedClientForServerComponent } from '../utils/ServerComponentUtils';

interface Props {
  sampleResultJson: string;
}

export default function StaticGenerationPage({ sampleResultJson }: Props): JSX.Element {
  const sampleResult = convertJsonPublishedClientResult(
    'sampleEntities',
    convertJsonResult(JSON.parse(sampleResultJson))
  );
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_NAME}</title>
      </Head>
      <FullscreenContainer>
        <FullscreenContainer.Row fullWidth>
          <NavBar current="home" />
        </FullscreenContainer.Row>
        <FullscreenContainer.Row>
          <h1>Welcome to {process.env.NEXT_PUBLIC_SITE_NAME}</h1>
          {sampleResult && <EntitySampleDisplay sampleResult={sampleResult} />}
        </FullscreenContainer.Row>
      </FullscreenContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async (_context) => {
  const publishedClient = await getPublishedClientForServerComponent();
  const sampleResult = await publishedClient.sampleEntities({}, { count: 5 });
  return { props: { sampleResultJson: JSON.stringify(sampleResult) } };
};
