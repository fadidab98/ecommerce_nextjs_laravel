import React,{useState,useEffect} from 'react'

import axios from 'axios';
import Layout from '../../../components/BackComponents/Layout';
import Head from 'next/head'
import styles from '../../../styles/Back/Details.module.css';
import NProgress from 'nprogress';
import { useRouter } from 'next/router';
import Loading from '../../../components/BackComponents/Loading';
export const getStaticPaths =async ()=>{
   const res = await axios.get('http://127.0.0.1:8000/api/product');
   const data = await res.data.data;
   const paths = data.map(da=>{
     return{
      params : {productId : da.id.toString()}
     }
    
   })
   return {
     paths,
     fallback: false
   }
}
export const getStaticProps =async (context)=>{
  const id = context.params.productId;
  const res = await fetch('http://127.0.0.1:8000/api/product/' + id);
  const data =  await res.json();
  
  return{
    props:{product : data }
  }

}
function productId({product}) {
  const router = useRouter();
const [changedImage,setChangedImage] = useState(`/uploads/post/${product.data.product_image}`)
const [loading,setLoading]=useState(true);
 const changedImageHandler =(e)=>{
     setChangedImage(e.target.src)
 }
 useEffect(()=>{
  if(product.status ==200)
  {
    setLoading(false)
  }
  
  router.events.on('routeChangeStart', () => NProgress.start() );

	router.events.on('routeChangeComplete', () => NProgress.done());
	router.events.on('routeChangeError', () =>  NProgress.done());
},[])

 
if(loading)
{
  return <Loading/>
}

  return (
    <>
    <Head>

    </Head>
 
    <div className='container'>
     
        <h1 className='text-center'>{product.data.product_title}</h1>
        <div className='row '>
       <div className='col-md-5'>
         <div className='row'>
           <div className='col-md-3'>
             <div className='d-flex flex-column pt-2 ' >
           <img className={styles.image} onClick={changedImageHandler} src={`/uploads/post/${product.data.product_image}`}/>
             {product.data.product_sub_images.split(',').map(ig=>{
               return(
                <img className={styles.image} onClick={changedImageHandler} src={`/uploads/post/${ig}`}/>

               )
             })}
             </div>
             </div>
           <div className='col-md-9 p-0 pt-5 '>
             <img className={styles.bigImage} src={changedImage} />
           </div>
         </div>
         <div className='row p-0'><div className='col-sm-6 p-0 m-0 pe-1'><button className='btn btn-success w-100'>Edit</button></div><div className='col-sm-6  p-0 m-0 ps-1'><button className='btn btn-danger w-100'>delete</button></div></div>
         </div>
       <div className='col-md-7 pt-5'>
         <div className='row'>
           <span>Price : <mark className='text-danger'>$ {product.data.product_price}</mark></span>
            <span className='d-flex'> Color : <div className='d-flex'> {product.data.product_color.split(',').map(color=>{
              return <button className='rounded-pill px-2  mx-1' style={{backgroundColor:color}} disabled></button>
            })}</div></span>
            <span className=''>Details : </span><div className='container'><p className='text-secondary'>{product.data.product_description}</p></div>
            
         </div>
       </div>

        </div>

    </div>
    </>
  )
}
productId.Layout = Layout
export default productId