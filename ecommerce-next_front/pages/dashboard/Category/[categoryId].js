import axios from 'axios'
import React,{useState,useEffect} from 'react'
import Layout from '../../../components/BackComponents/Layout';
import styles from '../../../styles/Back/Category.module.css'

import {useRouter} from 'next/router'

import NProgress from 'nprogress';
import Loading from '../../../components/BackComponents/Loading';
import Link from 'next/link';


export const getStaticPaths=async()=>{
 const res = await axios.get('http://127.0.0.1:8000/api/category')
 const data = await res.data.data;
 const paths = data.map(da=>{
  return{
    params:{ categoryId: da.id.toString()}
  }
 })
 return {
  paths, 
  fallback:false

 }
}
export const getStaticProps =async (context)=>{
 const id= context.params.categoryId;
 const res = await fetch('http://127.0.0.1:8000/api/category/'+id);
 const data = await res.json();
 return {
   props:{category:data}
 }
}




function categoryId({category}) {
  const router = useRouter();
const [loading,setLoading]=useState(true)
 
useEffect(()=>{
  if(category.status==200)
  {
    setLoading(false)
  }
  
router.events.on('routeChangeStart',()=> NProgress.start()&&setLoading(true))
router.events.on('routeChangeComplete',()=> NProgress.done()&&setLoading(false))
router.events.on('routeChangeError',()=>NProgress.done())

},[])

if(loading)
{
  return <Loading/>
}
  return (
    <>
    <div className='container'>
      <div className='row'>
        <h1 className='text-center'>{category.data.category_name}</h1>
        <div className='col-md-6'>
         <img className={styles.image} src={`/uploads/category/${category.data.category_image}`} />
         <div className='row mt-2'>
           <div className='col-sm-6'><Link href="/"><a className='btn btn-success w-100'><i className='fa fa-pen'></i></a></Link></div>
           <div className='col-sm-6'><Link href="/"><a className='btn btn-danger w-100 '><i className='fa fa-trash'></i></a></Link></div>
         </div>
        </div>
        <div className='col-md-6 '>
          <span>Amount : <mark className='badge bg-success' >{category.data.category_amount}</mark></span><br/>
          <span>Description : </span> <p className='text-secondary'>{category.data.category_description}</p>
        </div>
      </div>
    </div>
    </>
  )
}

categoryId.Layout = Layout;
export default categoryId