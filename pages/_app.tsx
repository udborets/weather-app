import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import Header from '$/components/header/Header';
import PageLayout from '$/layouts/PageLayout';
import '$/styles/global.scss';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </QueryClientProvider>
    </>
  )
}
