'use client'

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import CitySearchBar from "@/components/CitySearchBar/CitySearchBar";
import Header from "@/components/Header/Header";
import styles from './PageLayout.module.scss';

const queryClient = new QueryClient();

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <CitySearchBar />
      <main className={`${styles.pageLayout} flex justify-center items-center flex-grow w-full h-full`}>
        <div className="pageLayout__container h-full w-full flex flex-grow">
          {children}
        </div>
      </main>
    </QueryClientProvider>
  )
}

export default PageLayout