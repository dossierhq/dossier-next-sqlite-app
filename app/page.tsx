import { EntitySampleDisplay } from '../components/EntitySampleDisplay/EntitySampleDisplay';
import { Navbar } from '../components/Navbar/Navbar';
import styles from '../styles/info-page.module.css';
import { getPublishedClientForServerComponent } from '../utils/BackendServerUtils';

export default async function Page() {
  const publishedClient = await getPublishedClientForServerComponent();
  const sampleResult = await publishedClient.getEntitiesSample({}, { count: 5 });
  return (
    <>
      <Navbar current="home" />
      <section className={styles.container}>
        <h1 className={styles.header}>Using Dossier in App Router</h1>
        <EntitySampleDisplay sampleResult={sampleResult} />
      </section>
    </>
  );
}
