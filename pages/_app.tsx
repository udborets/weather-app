import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/global.scss';
import Header from '@/components/header/Header';

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}
