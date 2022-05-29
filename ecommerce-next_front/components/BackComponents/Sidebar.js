import Link from 'next/link'
import React from 'react'

function Sidebar() {
  return (

    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

     
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
        </a>

 
        <hr className="sidebar-divider my-0"/>

   
        <li className="nav-item active">
            <Link  href="/dashboard" >
                <a className="nav-link">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
                </a>
                </Link>
        </li>


        <hr className="sidebar-divider"/>


        <div className="sidebar-heading">
            Managment
        </div>

  
        <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                aria-expanded="true" aria-controls="collapseTwo">
                <i className="fas fa-fw fa-cog"></i>
                <span>Category </span>
            </a>
            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                 
                    <Link  href="/dashboard/Category"><a className="collapse-item">Categories</a></Link>
                    <Link className="collapse-item" href="/dashboard/Category/addCategory"><a className="collapse-item">Add Category</a></Link>
                </div>
            </div>
        </li>

   
        <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo1"
                aria-expanded="true" aria-controls="collapseTwo">
                <i className="fas fa-fw fa-cog"></i>
                <span>Product </span>
            </a>
            <div id="collapseTwo1" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                 
                    <Link  href="/dashboard/Product"><a className="collapse-item">Products</a></Link>
                    <Link className="collapse-item" href="/dashboard/Product/addProduct/"><a className="collapse-item">Add Product</a></Link>
                </div>
            </div>
        </li>

        <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo1sa"
                aria-expanded="true" aria-controls="collapseTwo">
                <i className="fas fa-fw fa-cog"></i>
                <span>Sales </span>
            </a>
            <div id="collapseTwo1sa" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                 
                    <Link  href="/dashboard/Product"><a className="collapse-item">Sales</a></Link>
                </div>
            </div>
        </li>
        <hr className="sidebar-divider"/>

 

        <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                aria-expanded="true" aria-controls="collapsePages">
                <i className="fas fa-fw fa-folder"></i>
                <span>Settings</span>
            </a>
            <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                   
                    <a className="collapse-item" href="login.html">Settings</a>
                  
                </div>
            </div>
        </li>


                <hr className="sidebar-divider d-none d-md-block"/>

   
        <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

      
        <div className="sidebar-card d-none d-lg-flex">
            <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..."/>
            <p className="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
            <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
        </div>

    </ul>

  )
}

export default Sidebar