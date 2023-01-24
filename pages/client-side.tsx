import type { EntitySamplingPayload, ErrorType, PublishedEntity, Result } from '@dossierhq/core';
import { FullscreenContainer } from '@dossierhq/design';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { EntitySampleDisplay } from '../components/EntitySampleDisplay/EntitySampleDisplay';
import { Navbar } from '../components/Navbar/Navbar';
import { usePublishedClient } from '../hooks/usePublishedClient';

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
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_NAME}</title>
      </Head>
      <FullscreenContainer>
        <FullscreenContainer.Row fullWidth>
          <Navbar current="csr" />
        </FullscreenContainer.Row>
        <FullscreenContainer.Row>
          <h1>Welcome to {process.env.NEXT_PUBLIC_SITE_NAME}</h1>
          {sampleResult && <EntitySampleDisplay sampleResult={sampleResult} />}
        </FullscreenContainer.Row>
      </FullscreenContainer>
    </>
  );
}
