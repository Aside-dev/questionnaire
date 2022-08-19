import { AppProps } from "next/app";
import "../style/globals.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
