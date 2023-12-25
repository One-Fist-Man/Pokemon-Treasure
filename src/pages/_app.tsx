import Footer from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import "@/styles/globals.css";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient());
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Navbar />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={true} /> 
          <Footer/>
        </HydrationBoundary>
      </QueryClientProvider>
    </div>
  );
}
