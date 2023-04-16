'use client'

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import Header from "@/components/Header/Header";

const queryClient = new QueryClient();

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {children}
    </QueryClientProvider>
  )
}

export default PageLayout