import { AppProps } from 'next/app';
import Layout from '../components/PageWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;