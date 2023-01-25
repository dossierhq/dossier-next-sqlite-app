import Head from 'next/head';
import '../styles/globals.css';

interface Props {
  Component: React.ComponentClass;
  pageProps: object;
}

export default function MyApp({ Component, pageProps }: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_NAME}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
