import "../styles/globals.css";
import "nprogress/nprogress.css";
import dynamic from "next/dynamic";
const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false }
);
import { wrapper } from "../store";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <TopProgressBar />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(App);
