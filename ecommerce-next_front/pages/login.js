import axios from '../lib/axios';
import { useRouter } from 'next/router';
import React,{useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import Layout from '../components/Layout';
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;
export default function login() {
    const [inputdata,setInputData]=useState({email:'', password:''});
    const router = useRouter()
    const inputChangeHandler=(e)=>{
        
       setInputData({...inputdata,[e.target.name]:e.target.value})
    }
    const submitForm= async (e)=>{
        e.preventDefault();
        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie").then((response) => {
       axios.post('http://127.0.0.1:8000/api/login',inputdata ).then(res=>{
        if(res.data.status ==200)
        {
       
          Cookies.set('jwt',res.data.token )
            localStorage.setItem("auth_name", res.data.username);
            Cookies.set('role',res.data.role )
            
            if(res.data.role == 0 )
            {
              router.push('/');
            }
            else{
              router.push('/dashboard');
            }
        }
       })
    
              
       })
   
        console.log(inputdata)
    }

  return (
      <div className='d-flex align-items-center justify-content-center' style={{height:'60vh',width:'100%'}}>
    <main className="form-signin w-50">
  <form className='w-100' onSubmit={submitForm}>
   
    <h1 className="h3 mb-3 fw-normal">Log In</h1>

    <div className="form-floating">
      <input type="email" name='email' className="form-control" id="floatingInput" value={inputdata.email} onChange={inputChangeHandler} />
      <label for="floatingInput">Email address</label>
    </div>
    <div className="form-floating">
      <input type="password" name='password' className="form-control" id="floatingPassword" value={inputdata.password} onChange={inputChangeHandler}/>
      <label for="floatingPassword">Password</label>
    </div>

    
    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

  </form>
</main>
</div>
  )
}
login.Layout = Layout;