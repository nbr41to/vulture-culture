import type { AppProps /*, AppContext */ } from 'next/app';
import { RecoilRoot } from 'recoil';
import 'styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default MyApp;
