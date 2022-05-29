import React,{useState,useEffect} from 'react'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory,{textFilter} from "react-bootstrap-table2-filter";
import Layout from '../../../components/BackComponents/Layout'
import { data } from 'jquery';
import axios from 'axios';
import Loading from '../../../components/BackComponents/Loading';
import Link from 'next/link'

import NProgress from 'nprogress';
import {useRouter} from 'next/router'

function index() {
  const router = useRouter();
 const [data,setData]= useState({});
 const [loading,setLoading]= useState(true);
useEffect(()=>{
  router.events.on('routeChangeStart',()=> NProgress.start() && setLoading(true))
  router.events.on('routeChangeComplete',()=> NProgress.done() && setLoading(false))
  router.events.on('routeChangeError',()=> NProgress.done())
    axios.get('http://127.0.0.1:8000/api/category').then(res=>{
      if(res.data.status ==200)
      {
        setData(res.data.data);
        
        setLoading(false);
      }
    }
    )
},[])
if(loading)
{
  return <Loading/>
}
const controllFunction=(cell, row)=>{
  return<div className='d-felx '>

    <Link  href={'Category/'+row.id}><a className='btn btn-success'><i className='fa fa-eye'></i></a></Link><a className='btn btn-danger'><i className='fa fa-trash'></i></a>
  </div>

}
const controlescription=(cell,row)=>{
  return <div>{cell.substr(0,60) + "..."}</div>
}

  const columns =[{
    dataField:"id",
    text:"Id",
    sort:true,
    headerStyle: {
      lineHeight:"60px"
     }
  },{
    dataField:"category_name",
    text:"Name",
    filter:textFilter()
  },
  {
    dataField:'category_description',
    text:'description',
    formatter:controlescription

  },
  {
    dataField:'category_amount',
    text:'amount',

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
export default index