import "../styles/globals.css";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Head from "next/head";

const supportedChainIds = [4];
const connector = {
  injected: {},
};

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connector}
    >
      <Head>
        <title>CoinOne</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/logo.png" />
        <meta
          name="facebook-domain-verification"
          content="2texl7ozql70o8y075dpem07rw24ns"
        />
      </Head>
      <Component {...pageProps} />
    </ThirdwebWeb3Provider>
  );
}

export default MyApp;
