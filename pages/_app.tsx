import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider {...pageProps}>
        <SignedIn>
          <Component {...pageProps} />
        </SignedIn>
      </ClerkProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
