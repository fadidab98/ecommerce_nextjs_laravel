import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'

import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import Cookies from 'js-cookie'
import axios from 'axios';

config.autoAddCss = false;

import {useEffect} from 'react'

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = Cookies.get('jwt');
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});


function MyApp({ Component, pageProps }) {
  
  const Layout = Component.Layout || EmptyLayout

  
  return  <Layout>  <Component {...pageProps} /></Layout>
  
}
const EmptyLayout =({children})=><>{children}</>;
export default MyApp
