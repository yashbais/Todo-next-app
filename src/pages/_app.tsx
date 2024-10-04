import { AppProps } from 'next/app';
import '../styles/globals.css';
import '@mantine/core/styles.css';

import Header from '../components/Header';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default App;
