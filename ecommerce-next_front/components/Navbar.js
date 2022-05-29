import { useRouter } from 'next/router'
import React,{useEffect, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowRight,
  faClose,
  faShoppingCart,
  faAnchor,
} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import Head from 'next/head'
export default function Navbar() {
 
  const router = useRouter(); 
  const [showSide,setShowSide] = useState(false);
  const showSideHandler=()=>{
    if(showSide)
    {
      setShowSide(false)
    }
    else{
      setShowSide(true)
    }
  }
  console.log(showSide)
  var Auth ='';
  

    if(!Cookies.get('jwt'))
    {
      Auth = (<>
<Link href='/login' className='px-2'>Login </Link> 
<Link href='/register' className='px-2'>Register </Link>
        </>
      );
    }else{
      Auth = (
        <button onClick={logoutFunction} className='btn px-2'>Logout</button> 
      );
    }
  
 
  function logoutFunction(e){
  
    e.preventDefault();
       axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie").then((response) => {
     axios.post("http://127.0.0.1:8000/api/logout").then(res=>{
       if(res.data.status == 200)
       {
        localStorage.removeItem("auth_name");
        Cookies.remove('role')
        Cookies.remove('jwt')
        router.push("/");
     
      
        
       }
     });
     });


}

 console.log(router.asPath)
  return (
    <>
    <Head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/hover.css/2.3.1/css/hover-min.css"/>
    </Head>
    <nav id="navbar" className=''>
    
       <button id="showButton" onClick={showSideHandler}>Ecommerce Logo{showSide}</button>
      <ul id="navbar_list">
        <li className={router.asPath === '/' ?'active': '' }><Link href='/'>Home </Link> </li>
        <li className={router.asPath === '/About' ?'active': '' }><Link href='/About'>About Us </Link></li>
       
           <li > <div className="dropdown1">
                <button className="dropbtn1">Dropdown 
                  <FontAwesomeIcon icon={faArrowDown} style={{ fontSize: 13,paddingLeft:7}}/>
                </button>
                <div className="dropdown-content1">
                  <a href="#">Link 1</a>
                  <a href="#">Link 2</a>
                  <a href="#">Link 3</a> 
                </div>
              </div>
          </li>
      </ul>
      <div id="navbar_smal" style={ {width: showSide ?'18rem':'0rem',visibility:showSide ?'visible':'hidden'}}>
     <div id="navbar_smal_close"> <button id="closeButton" onClick={()=>setShowSide(false)}><FontAwesomeIcon icon={faClose} style={{ fontSize: 20 , lineHeight:'1rem'}}/></button></div>
      <ul id="navbar_smal_list">
      <li className={router.asPath === '/' ?'active hvr-underline-from-left': ' button hvr-underline-from-left' }><Link href='/'>Home </Link> </li>
        <li className={router.asPath === '/About' ?'active': 'button hvr-underline-from-left' }><Link href='/About'>About Us </Link></li>
       
           <li > <div className="dropdown1 ">
                <button className="dropbtn1 hvr-icon-forward hvr-underline-from-left">Dropdown 
                  <FontAwesomeIcon className='hvr-icon' icon={faArrowRight} style={{ fontSize: 13,paddingLeft:7}}/>
                </button>
                <div className="dropdown-content1">
                  <a href="#">Link 1</a>
                  <a href="#">Link 2</a>
                  <a href="#">Link 3</a> 
                </div>
              </div>
          </li>
      </ul>
      </div>
      <div className='me-4'>
          <Link  href="/cart"><a><FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: 13,paddingLeft:7,paddingRight:7}}/><span className='number_cart'>1</span></a></Link>
       {Auth} 
      </div> 
      </nav>
      </>
  )
}
