import React,{useState,useEffect} from 'react'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory,{textFilter} from "react-bootstrap-table2-filter";
import Layout from '../../../components/BackComponents/Layout'
import { data } from 'jquery';
import axios from 'axios';
import Loading from '../../../components/BackComponents/Loading';
import Link from 'next/link'
import { useRouter } from 'next/router';

import NProgress from 'nprogress';

 function index() {
  const router = useRouter();
    const [data,setData]= useState({});
    const [loading,setLoading]= useState(true);
   useEffect(()=>{
    router.events.on('routeChangeStart', () => NProgress.start() && setLoading(true) );

    router.events.on('routeChangeComplete', () => NProgress.done());
    router.events.on('routeChangeError', () =>  NProgress.done());
       axios.get('http://127.0.0.1:8000/api/product').then(res=>{
         if(res.data.status ==200)
         {
           setData(res.data.data);
           
           setLoading(false);
         }
       }
       )
   },[])
   const handeLImage=(cell,row)=>{
    return <div><img style={{width:'40px',height:'50px'}} src={'/uploads/post/'+cell} /></div>
  }
   const controllFunction=(cell, row)=>{
     return<div className='d-felx '>
   
   <Link href={`Product/${row.id}`} ><a className='btn btn-success' > <i className='fa fa-eye'></i></a></Link> 
    <a className='btn btn-danger'><i className='fa fa-trash'></i> </a>
     </div>
 
   }
   
   
     const columns =[{
       dataField:"id",
       text:"Id",
       sort:true,
       headerStyle: {
         lineHeight:"60px"
        }
     },
     {
       dataField:'product_image',
       text:'Image',
       formatter:handeLImage
     },
     {
       dataField:"product_title",
       text:"Name",
       filter:textFilter()
     },
     {
       dataField:'product_price',
       text:'Price',
   
     },
   {
     dataField:'categoryName',
     text:'Category',
     filter:textFilter()
   },
    
     {
      
       text: 'Controll',
       formatter:controllFunction,
       headerStyle: {
         lineHeight:"60px"
        }
     }
   ]
   if(loading)
    {
      return <Loading/>
    }
     return (
       <>
      
       <div >
         <BootstrapTable 
       keyField="id" 
        data={data}
        columns={columns} 
        striped 
        hover
        
        pagination={paginationFactory()}
        filter={filterFactory()}
        />
        </div>
        </>
        )
}


index.Layout = Layout;
export default index;