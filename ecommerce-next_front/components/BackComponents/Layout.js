import Navbar from './Navbar'
import Footer from './Footer'
import { useEffect ,useState} from 'react'
import axios from 'axios';
import Head from 'next/head';
import  Router from 'next/router';
import $ from 'jquery'; 
import Cookies from 'js-cookie'
import NProgress from 'nprogress'
NProgress.configure({showSpinner:false})

import { useRouter } from 'next/router'
import Sidebar from './Sidebar';
import Script from 'next/script';

import Loading from './Loading';

function Layout({children}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading,setLoading]=useState(true)
  const router = useRouter();

 const jj = () => 
 {
  window.jQuery = $;
    $("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
       $(".sidebar .collapse").collapse("hide");
      }
    });
    $("body.fixed-nav .sidebar").on(
      "mousewheel DOMMouseScroll wheel",
      function (e) {
        if ($(window).width() > 768) {
          var e0 = e.originalEvent,
            delta = e0.wheelDelta || -e0.detail;
          this.scrollTop += (delta < 0 ? 1 : -1) * 30;
          e.preventDefault();
        }
      }
    );
    $(window).resize(function () {
      if ($(window).width() < 768) {
        $(".sidebar .collapse").collapse("hide");
      }
    });

  };

  useEffect(() => {
  

   
      jj();
  

 
    axios.get("http://127.0.0.1:8000/api/checkingAuthenticatedAdmin").then((res) => {
      if (res.status === 200) {
        setAuthenticated(true);
        setLoading(false)
      }
  
    });
    return () => {
      setAuthenticated(false);
      
    };
  }, []);
   axios.interceptors.response.use(
     undefined,
     function axiosRetryInterceptor(err) {
       
       return Promise.reject(err);
     }
   );
    axios.interceptors.response.use(function (response){
      return response;
    },function (error){
      if( error.response.status ==403 ) //access denied
      {
        try{
        return  router.replace('/403');
        }catch(e)
        {
          return null
        }
    
      }
      else if( error.response.status ==401 ) //access denied
      {
        
      router.replace('/');
    
      }
      else if( error.response.status ==404 ) //Page Not Founded
      {
       
      
  
      }
      return Promise.reject(error);
    })


if(loading)
{
  return <Loading/>
}



  return (
    <>
      <Head>
      
      <link href="/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"/>
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"/>
    <link href="/css/sb-admin-2.min.css" rel="stylesheet"/>
    <link href="/css/index.css" rel="stylesheet"/>
      </Head>
      <div id="wrapper">
     <Sidebar/>
    <div id="content-wrapper" className="d-flex flex-column">


      <div id="content">
      <Navbar />
      
      <div className="container-fluid">
     
      { children}
         
            </div>

      </div>
      </div>
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
    </a>

  
    <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a className="btn btn-primary" href="login.html">Logout</a>
                </div>
            </div>
        </div>
    </div>
        
      

      
    <Script src="/vendor/jquery/jquery.min.js"></Script>
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.1/js/bootstrap.min.js" ></Script>
    <Script src="/vendor/bootstrap/js/bootstrap.bundle.min.js"></Script>

    <Script src="/vendor/jquery-easing/jquery.easing.min.js"></Script>


    <Script src="/js/sb-admin-2.min.js"></Script>





    </>
  )
}

export default Layout