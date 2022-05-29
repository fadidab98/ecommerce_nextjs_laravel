import axios from 'axios'
import React,{ useEffect ,useState} from 'react'

import styles  from '../../../styles/Home/Header.module.css'
function Header() {
    
  return (
    <div id="carouselExampleDark" className="carousel  slide" data-bs-ride="carousel">
    
    <div className="carousel-inner">
      <div className="carousel-item active" data-bs-interval="10000">
        <img src="/uploads/website/1.jpg" className="d-block w-100" alt="..." style={{height:'80vh',objectFit:'cover'}}/>
        
      </div>
      <div className="carousel-item" data-bs-interval="2000">
        <img src="/uploads/website/2.jpg" className="d-block w-100" alt="..." style={{height:'80vh',objectFit:'cover'}}/>
        
      </div>
      <div className="carousel-item">
        <img src="/uploads/website/3.jpg" className="d-block w-100" alt="..." style={{height:'80vh',objectFit:'cover'}}/>
        
      </div>
    </div>
    <button className={"carousel-control-prev  "+ styles.button_prev} type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className={"carousel-control-next "+styles.button_next} type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  )
}

export default Header