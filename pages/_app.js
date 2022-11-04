import useIsFirstRender from '@/hooks/useIsFirstRender';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
  const isAppFirstRender = useIsFirstRender();

  return (
    <Layout>
      <Component isAppFirstRender={isAppFirstRender} {...pageProps} />
    </Layout>
  );
}

export default MyApp;
