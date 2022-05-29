

import React,{ useEffect,useState }  from 'react'

import Layout from '../../../../components/BackComponents/Layout'
import $ from 'jquery'
import axios from 'axios';
import NProgress from 'nprogress'
import {useRouter} from 'next/router'

function index() {
     const router = useRouter();
     const [message,setMessage]=useState('');
	 const [loading,setLoading]=useState(true);
	 const [errorMessage,setErrorMessage]=useState();
   const [inputData,setInputData]=useState({title:'', description:''})
   const [picture, setPecture] = useState({ image: "" });
   const handelInput=(e)=>{
	   setInputData({...inputData,[e.target.name]:e.target.value});
   }
   const handelImage=(e)=>{
	   setPecture({image:e.target.files[0]});
   }
//    toastr.success('Success');

useEffect(()=>{
	router.events.on('routeChangeStart', () =>  NProgress.start());
	router.events.on('routeChangeComplete', () =>  NProgress.done());
	router.events.on('routeChangeError', () =>  NProgress.done());
},[])


   const submitHanler= (e)=>{
	NProgress.start();
	   e.preventDefault();
	   const formData = new FormData();
	   formData.append("title", inputData.title);
	   formData.append("description", inputData.description);
	  
	   formData.append("image", picture.image);


	 
	  
	   axios.post('http://127.0.0.1:8000/api/create_category',formData).then(res=>{
		   if(res.data.status ==200)
		   {
			
			setMessage(res.data.message);
			NProgress.done()
			setErrorMessage('');
			setInputData({title:'',description:''});
		  setPecture({image:''})
		   }
		   else{
	
			setErrorMessage(res.data.error_message);
			NProgress.done()
			setMessage('')
		   }
	   })
	
   }
   
  return(
  <>
  <div className='card'>
	  <div className='card-header'>Add Category</div>
	  <div className='card-body'>
				{message?(
				<div className="alert alert-success alert-dismissible fade show" role="alert">
			      {message}
			<button type="button" className="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
			</div>):''}
			{errorMessage ?(
				<div className="alert alert-warning alert-dismissible fade show" role="alert">
			      <ul>
				  			{errorMessage.title ?<li>{errorMessage.title}</li>:'' }                  
							  {errorMessage.image ?<li>{errorMessage.image}</li>:'' } 
							  {errorMessage.description ?<li>{errorMessage.description}</li>:'' } 
				  </ul>
			<button type="button" className="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
			</div>):''}
	  <form onSubmit={submitHanler} encType="multipart/form-data">
	  <div className='form-group'>
		  <label>Title</label>
		  <input name="title" onChange={handelInput} value={inputData.title} className='form-control' type="text" placeholder='Category Title' />
	  </div>
	  <div className='form-group'>
		  <label>Image</label>
		  <input  type="file" name="image" onChange={handelImage} defaultValue={picture.image} className='form-control'/>
	  </div>
	  <div className='form-group'>
		  <label>Description</label>
		  <textarea  name="description" onChange={handelInput} value={inputData.description}  className='form-control' type="text"  ></textarea>
	  </div>
		<div className='d-flex justify-content-center'><button className='btn btn-success'>Save</button></div>
  </form>
	  </div>
	  
	  </div>

  </> 
   )
}
index.Layout = Layout
export default index