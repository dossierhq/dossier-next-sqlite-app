import Link from 'next/link';
import { EntitySampleDisplay } from '../components/EntitySampleDisplay/EntitySampleDisplay';
import { FrontendUrls } from '../utils/FrontendUrls';
import { getPublishedClientForServerComponent } from '../utils/ServerComponentUtils';

export default async function Page() {
  const publishedClient = await getPublishedClientForServerComponent();
  const sampleResult = await publishedClient.sampleEntities({}, { count: 5 });
  return (
    <>
      <h1>Welcome to {process.env.NEXT_PUBLIC_SITE_NAME}</h1>
      <p>
        This page is rendered server side using the <code>app</code> directory.
      </p>
      <EntitySampleDisplay sampleResult={sampleResult} />
      <hr />
      <ul>
        <li>
          Go to <Link href={FrontendUrls.clientSide}>client-side</Link> to see how to render client
          side
        </li>
      </ul>
    </>
  );
}
