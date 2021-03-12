import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
import { Router } from 'next/dist/client/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '../styles/globals.css'
import { AuthProvider } from "../context/auth";
import { AnalyticsProvider } from "../context/analytics";

import Head from 'next/head';

NProgress.configure({ showSpinner: false, trickleRate: 0.1, trickleSpeed: 300 });

Router.events.on('routeChangeStart', () => {
    NProgress.start() 
})

Router.events.on('routeChangeComplete', () => {
    NProgress.done();
})

Router.events.on('routeChangeError', () => {
    NProgress.done();
})

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  return <>
        {/* <Head>
            <script src="https://www.paypal.com/sdk/js?client-id=ARrYpMKRCD6wqKZwCWOwfJLFLHn3uGbhn7baYHXWwKoJ6r00e6PiJo-M0v6kbhEZqQBwU2SYxt38PDFa&vault=true&intent=subscription" data-sdk-integration-source="button-factory"></script>
        </Head> */}
        <AuthProvider> 
            <AnalyticsProvider>
                <Component {...pageProps} />
            </AnalyticsProvider>    
        </AuthProvider>
    </>
}

export default MyApp
