import { SlideshowProvider } from '@/contexts/SlideshowContext';
import useIsFirstRender from '@/hooks/useIsFirstRender';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
  const isAppFirstRender = useIsFirstRender();
  const { total } = pageProps;

  return (
    <SlideshowProvider total={total}>
      <Layout>
        <Component isAppFirstRender={isAppFirstRender} {...pageProps} />
      </Layout>
    </SlideshowProvider>
  );
}

export default MyApp;
