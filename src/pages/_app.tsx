import { Navbar } from "@/components/Navbar/Navbar";
import "@/styles/globals.css";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
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
        </HydrationBoundary>
      </QueryClientProvider>
      {/* <Footer/> */}
    </div>
  );
}
