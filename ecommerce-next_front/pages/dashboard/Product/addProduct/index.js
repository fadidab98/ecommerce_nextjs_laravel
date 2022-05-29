import React,{useState,useEffect} from 'react'
import smartWizard from 'smartwizard'
import Head from 'next/head'
import Script from 'next/script'
import Layout from '../../../../components/BackComponents/Layout'
import axios from 'axios'
import { formatWithValidation } from 'next/dist/shared/lib/utils'
import { faArrowUpFromGroundWater } from '@fortawesome/free-solid-svg-icons'
import Loading from '../../../../components/BackComponents/Loading';
import { useRouter } from 'next/router';
import NProgress from 'nprogress'
// export const getStaticProps= async()=>{
//   const res = await axios.get('http://127.0.0.1:8000/api/category');
 
//     const data = await res.data;
//     return {
//       props:{datas:data}
//     }

  
//  }
function index() {
    const router = useRouter();
    const [message,setMessage]=useState("");
    const [ErrorMessage,setErrorMessage]=useState();
    const [category,setCategory]=useState([]);
    const [inputData,setInputData]=useState({
        title:'',
        description:'',
        category_id:'',
        status:'1',
        price:'',
        images:[]
    })
    const [picture,setPicture]=useState({image:''});
     const [loading,setLoading] = useState(true);
      const [color,setColor]=useState([]);


        // functions


      const colorHandler=(e)=>{
            setColor([...color,e.target.value])
      }
      const InputHandler=(e)=>{
          setInputData({...inputData,[e.target.name]:e.target.value})
      }
      console.log(color);

      const inputManyImage = (e) => {
        setInputData({ ...inputData, images: [...inputData.images,...e.target.files] });
      };

      const pictureHandler=(e)=>{
          setPicture({image:e.target.files[0]});
      }
    //   useEffect
    useEffect(()=>{
        router.events.on('routeChangeStart', () =>  NProgress.start());
        router.events.on('routeChangeComplete', () =>  NProgress.done());
        router.events.on('routeChangeError', () =>  NProgress.done());
        axios.get('http://127.0.0.1:8000/api/category').then(res=>{
            if(res.data.status ==200)
            {
                setCategory(res.data.data);
              setLoading(false);
            }
          }
          )



		$('#smartwizard').smartWizard({
			selected: 0, 
			theme: 'default', 
			justified: true, 
			darkMode:false, 
			autoAdjustHeight: true,
			cycleSteps: false, 
			backButtonSupport: true, 
			enableURLhash: true,
			transition: {
				animation: 'none', 
				speed: '400', 
				easing:'' 
			},
			toolbarSettings: {
				toolbarPosition: 'bottom',
				toolbarButtonPosition: 'right', 
				showNextButton: true,
				showPreviousButton: true,
				toolbarExtraButtons: []
			},
			anchorSettings: {
				anchorClickable: true, 
				enableAllAnchors: false, 
				markDoneStep: true, 
				markAllPreviousStepsAsDone: true, 
				removeDoneStepOnNavigateBack: false, 
				enableAnchorOnDoneStep: true 
			},
			keyboardSettings: {
				keyNavigation: true, 
				keyLeft: [37], 
				keyRight: [39] 
			},
			lang: { 
				next: 'Next',
				previous: 'Previous'
			},
			disabledSteps: [], 
			errorSteps: [], 
			hiddenSteps: [] 
		  });
          $(".tab-content").height("auto");
         
	},[])
    console.log(inputData)
    const submitForm=(e)=>{
      NProgress.start()
           
        
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", inputData.title);
        formData.append("description", inputData.description);
        formData.append('image',picture.image);
        formData.append('category_id',inputData.category_id);
        formData.append('status',inputData.status);
        formData.append('color',color);
        formData.append('price',inputData.price);
        inputData.images.forEach((image_file) => {  formData.append('images[]', image_file);  });
        

        // request to backend
        axios.post('http://127.0.0.1:8000/api/create_product',formData).then(res=>{
            
            if(res.data.status ==200){
                setMessage(res.data.message);
                setErrorMessage('');
                NProgress.done()
            }
            else{
                setErrorMessage(res.data.error_message);
                setMessage('');
                NProgress.done()
            }
        })
          
        console.log(...formData);


    }

   
    
        return (
       
           
            <>
             {loading&& <Loading/>}
            <Head>
        
            <link href="https://cdn.jsdelivr.net/npm/smartwizard@5/dist/css/smart_wizard_all.min.css" rel="stylesheet" type="text/css" />
            </Head>
        

                <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Form step</h4>
                </div>
                <div className="card-body">
            
                                    {message?(
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {message}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>):''}
                    {ErrorMessage?(
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <ul>
                                    {ErrorMessage.title ?<li>{ErrorMessage.title}</li>:'' }                  
                                    {ErrorMessage.image ?<li>{ErrorMessage.image}</li>:'' } 
                                    {ErrorMessage.description ?<li>{ErrorMessage.description}</li>:'' } 
                                    {ErrorMessage.price ?<li>{ErrorMessage.price}</li>:'' }                  
                                    {ErrorMessage.color ?<li>{ErrorMessage.color}</li>:'' } 
                                    {ErrorMessage.status ?<li>{ErrorMessage.status}</li>:'' } 
                                    {ErrorMessage.category_id ?<li>{ErrorMessage.category_id}</li>:'' } 
                        </ul>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>):''}
        
        
        
                <form id="smartwizard" className="form-wizard order-create h-auto" onSubmit={submitForm} encType="multipart/form-data">
                    <ul className="nav nav-wizard">
                        <li><a className="nav-link" href="#wizard_Service"> 
                            <span>1</span> 
                        </a></li>
                        <li><a className="nav-link" href="#wizard_Time">
                            <span>2</span>
                        </a></li>
                        
                        
                    </ul>
                    <div className="tab-content h-auto">
                        <div id="wizard_Service" className="tab-pane" role="tabpanel">
                            <div className="row">
                                <div className="col-lg-12 mb-2">
                                    <div className="form-group">
                                        <label className="text-label">Title</label>
                                        <input type="text" onChange={InputHandler} name="title" className="form-control" placeholder="Title" required=""/>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-2">
                                    <div className="form-group">
                                        <label className="text-label">Image</label>
                                        <input type="file" name="image" onChange={pictureHandler} className="form-control" id="inputGroupPrepend2" aria-describedby="inputGroupPrepend2" placeholder="example@example.com.com" required=""/>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-2">
                                    <div className="form-group">
                                        <label className="text-label">Category</label>
                                        <select name='category_id' onChange={InputHandler}  className="form-select" aria-label="Default select example">
                                        <option selected >Choose Category</option>
                                                {category.map(da=>{
                                                    return     <option value={da.id}>{da.category_name}</option>
                                                })}
                                            
                                                </select>
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-2">
                                    <div className="form-group">
                                        <label className="text-label">Description</label>
                                    <textarea className='form-control' name="description" onChange={InputHandler}  row="20"></textarea>
                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>
                        <div id="wizard_Time" className="tab-pane h-auto" role="tabpanel">
                            <div className="row h-auto">
                                <div className="col-lg-6 mb-2">
                                    <div className="form-group">
                                        <label className="text-label">More Image</label>
                                        <input type="file" name="images[]" multiple onChange={inputManyImage} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-2">
                                    <div className="form-group">
                                        <label className="text-label">Status</label>
                                        <div class="form-check">
                                        <input className="form-check-input" type="radio" name="status"  value="1"  onChange={InputHandler} id="flexRadioDefault1" defaultChecked/>
                                        <label className="form-check-label" for="flexRadioDefault1">
                                            Visible
                                        </label>
                                        </div>
                                        <div className="form-check">
                                        <input className="form-check-input" type="radio" name="status"  value="0" onChange={InputHandler} id="flexRadioDefault2" />
                                        <label className="form-check-label" for="flexRadioDefault2">
                                            Hidden
                                        </label>
                                        </div>
                                </div>   </div>
                                <div className="col-lg-6 mb-2">
                                    <div className="form-group">
                                        <label className="text-label">Color</label>
                                        <input type="color" onChange={colorHandler} className="form-control" id="emial1"  required=""/>
                                        <div className='w-100 d-felx justify-content-center ' >
                                        {color.map(co=>{
                                            return  <button className='btn rounded-pill mx-1' style={{backgroundColor:co,height:'1rem',width:'1rem'}}></button>
                                        })}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-2">
                                    <div className="form-group">
                                        <label className="text-label">Price</label>
                                        <input type="number" onChange={InputHandler} step="0.1" name="price" className="form-control"  required=""/>
                                    </div>
                                </div>
                                <div className='w-100 d-flex justify-content-center mb-4'><button className='btn btn-success'>Save</button></div>
                            </div>
        
            
                        
                        </div> 
                        
                        
                    </div>
                    
                </form>
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
                                    </div>
                </div>
        
        
                <Script src="https://cdn.jsdelivr.net/npm/smartwizard@5/dist/js/jquery.smartWizard.min.js" type="text/javascript"></Script>             
             
        </>
        )
  
 



 
}
index.Layout = Layout;
export default index