import { EntitySampleDisplay } from '../components/EntitySampleDisplay/EntitySampleDisplay';
import { NewNavBar } from '../components/NewNavbar/NewNavbar';
import { getPublishedClientForServerComponent } from '../utils/ServerComponentUtils';

export default async function Page() {
  const publishedClient = await getPublishedClientForServerComponent();
  const sampleResult = await publishedClient.sampleEntities({}, { count: 5 });
  return (
    <>
      <NewNavBar current="home" />
      <h1>Welcome to {process.env.NEXT_PUBLIC_SITE_NAME}</h1>
      <p>
        This page is rendered server side using the <code>app</code> directory.
      </p>
      <EntitySampleDisplay sampleResult={sampleResult} />
    </>
  );
}
