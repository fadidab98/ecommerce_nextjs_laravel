import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/FrontCompnents/Home/Header'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import Cookies from 'js-cookie'

import { useEffect } from 'react'
// export const getStaticProps= async()=>{
//   const res = await axios.get('http://127.0.0.1:8000/api/Home');
//   const data = await res.data;
//   return {
//     props:{datas:data}
//   }
//  }
export default function Home(props) {

  return (
   <div id="container"> 

     <div className={styles.master_container}>
     <Header/>
     <section className={styles.top_products}>
     <div className='container-fluid '>
       <div className={'card '+styles.card}>
         <div className={'card-header '+styles.card_header}>Samsung</div>
         <div className='card-body'> </div>
       </div>
       <div className={'card '+styles.card}>
         <div className={'card-header '+styles.card_header}>Samsung</div>
         <div className='card-body'> </div>
       </div> <div className={'card '+styles.card}>
         <div className={'card-header '+styles.card_header}>Samsung</div>
         <div className='card-body'> </div>
       </div> <div className={'card '+styles.card}>
         <div className={'card-header '+styles.card_header}>Samsung</div>
         <div className='card-body'> </div>
       </div> <div className={'card '+styles.card}>
         <div className={'card-header '+styles.card_header}>Samsung</div>
         <div className='card-body'> </div>
       </div> <div className={'card '+styles.card}>
         <div className={'card-header '+styles.card_header}>Samsung</div>
         <div className='card-body'> </div>
       </div>

     </div>
     </section>
     </div>
    
     <div>ddddddddddd</div>

 
   </div>
  )
  }
  Home.Layout = Layout;