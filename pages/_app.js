import "../styles/globals.css";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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
      <Component {...pageProps} />
    </ThirdwebWeb3Provider>
  );
}

export default MyApp;
