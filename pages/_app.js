
import '../styles/globals.css'
import 'react-quill/dist/quill.snow.css';
import { CookiesProvider } from "react-cookie";
function MyApp({ Component, pageProps }) {

  return (
    <>
   
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
  
    </>
  )
}

export default MyApp
