import { useParams } from 'react-router-dom'
import NavBar from './NavBar'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import VerticalElips from './SVG/VerticalElips'
import axios from 'axios'
import Loader from './Loader'
export default function ShowNotes() {
    const selector1=useSelector((state:any)=>state.getUserName)
    const selector2=useSelector((state:any)=>state.Check)
    const [userName,setUserName]=useState('')
    const [showMenu,setShowMenu]=useState(true)
    const [loader,setLoader]=useState(true)
    const [data,setData]=useState({} as any)
    const {id}= useParams()
    useEffect(()=>{
        if(selector2.value){
            setUserName(selector1.name);
          }
    },[selector1,selector2]) 
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.post(`/notes`, { id: id }, { headers: { 'Content-Type': 'application/json' } });
            console.log(res.data[0].Notes[0]);
            setData(res.data[0]);
            console.log(data);
          } catch (err) {
            console.log(err);
          } finally {
            setLoader(false);
          }
        };
        fetchData();
      }, [id]);
      useEffect(() => {
        console.log("Updated data:", data);
      }, [data]);
  return (
    <>
    {loader?<div className='absolute left-[50%] top-[50%] bottom-[50%] right-[50%]'><Loader/></div>:
    <>
    <NavBar username={userName}>    
    </NavBar>
        <div className='mt-32 text-white mx-auto w-[80%]'>
        <h1 className='text-3xl'>{data.category}</h1>
        <div className='w-[100%]  bg-[#0400ff] mt-4 rounded-[2%] p-6 h-[540px]'>
         <div className='grid grid-cols-3 p-4'>
         <div className='items-center col-start-2 col-end-3 text-2xl font-bold text-center '>{data.Notes[0].title}</div>
            <div className='flex justify-end me-4'><button className='w-2' onClick={()=>{
                setShowMenu(!showMenu)
            }}><VerticalElips></VerticalElips></button>
            
            </div>
            <div className={`col-span-3 col-start-3 col-end-4 ${showMenu?"scale-y-0":"scale-y-100"} duration-1000 transition-all origin-top h-5 
 rounded-full me-4 w-[200px] justify-self-end`}>
            <div className={`flex justify-center   me-4 } duration-700 transition-all origin-top  bg-blue-700 p-2 w-full h-16 `}><button className='w-full p-2 text-center transition-all duration-700 border-b-2 border-blue-700 border-solid hover:border-white'>Edit note</button></div>
            <div className={`flex justify-center    me-4  duration-700 transition-all origin-top  bg-blue-700 p-2 w-full h-16 rounded-b-lg `}><button className='w-full p-2 text-center transition-all duration-700 border-b-2 border-blue-700 border-solid hover:border-white'>Delete note</button></div>
            </div>
            </div>   
        
       
        <div className='overflow-y-auto h-[300px] col-span-3 my-6 mx-7' onClick={()=>{
            setShowMenu(true)
        }}> {data.Notes[0].content}</div>
    
<div className='text-right '>Submitted on:<i className='text-sm font-thin mx-7'>{data.Notes[0].SubmissionDate}</i></div>
        </div>
   
        </div>
        </>}
        
     
    </>
  )
}
