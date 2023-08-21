import StoreProvider from '../context/store-context'
import Layout from '../components/Layout'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
        <Layout>
        <Component {...pageProps} />
    </Layout>
      </StoreProvider>
  )
}

export default MyApp
