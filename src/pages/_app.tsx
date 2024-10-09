import '../styles/globals.css';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import type { AppProps } from "next/app";

if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
  import('../mocks').then(({ setupMocks }) => {
    setupMocks()
  })
}

const theme = createTheme({
  colors: {
    customPurple: [
      '#f3e8ff',
      '#e2ccff',
      '#d1b0ff',
      '#bf94ff',
      '#ae78ff',
      '#9d5dff',
      '#723fff',
      '#6034cc',
      '#4e29a3',
      '#3c1f7a'
    ],
  },
});


export default function App({ Component, pageProps }: AppProps) {
  return <>
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  </>
}
