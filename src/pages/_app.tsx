import { AppProps } from 'next/app';
import '../styles/globals.css';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import Layout from '@/pages/Todo/Layout';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
  colors: {
    // Define custom shades for your purple color based on rgb(114, 64, 255)
    customPurple: [
      '#f3e8ff', // Lightest
      '#e2ccff',
      '#d1b0ff',
      '#bf94ff',
      '#ae78ff',
      '#9d5dff', // Base color close to rgb(114, 64, 255)
      '#723fff',
      '#6034cc',
      '#4e29a3',
      '#3c1f7a'  // Darkest
    ],
  },
});


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider theme={theme}>
      <Layout />
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default App;
