import { NextResponse } from "next/server";
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
export default function middleware(req){
  const {cookies} = req;
  const token = Cookies.get('jwt')
  const role = Cookies.get('role')
  const url = req.url;


//   // if(url.includes('/login'))
//   // {
//   //   if(jwt)
//   //   {
//   //     try{
//   //       return NextResponse.redirect(new URL('/register',url));
       
//   //     }
//   //     catch (e){
//   //       return NextResponse.next();
//   //     }
//   //   }

//   // }




    // if(token == undefined )
    // {
      
    
    //   return NextResponse.redirect(new URL('/',url));
    // }
    // try{
 
    //   return NextResponse.next();
    // }
    // catch (e){
    //   return NextResponse.redirect(new URL('/',url));
    // }

    


}