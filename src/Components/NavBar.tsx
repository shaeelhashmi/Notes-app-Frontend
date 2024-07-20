import { useNavigate,Link } from "react-router-dom";
import { useEffect,useState } from "react";
import { useSelector } from 'react-redux'

export default function NavBar() {
  const mode=useSelector((state:any)=>state.Mode.Mode)
  const selector1=useSelector((state:any)=>state.getUserName)
  const selector2=useSelector((state:any)=>state.Check)
  const [userName,setUsername]=useState('');
  useEffect(() => {
    if(selector2.value){
     setUsername(selector1.name);
   }
   },[selector1,selector2])
  const navigate=useNavigate();
  return ( 
    <div className={`${mode?"bg-[#BACFFF] text-black":"bg-[rgb(4_0_43)] text-white"}  p-3 grid grid-flow-col  sm:grid-cols-3 text-sm md:text-lg place-content-center  justify-items-center items-center gap-5 fixed top-0 w-full grid-cols-2`}>
      <div className="flex flex-col items-center w-full">
            <div className="w-full text-center "> {userName}</div>  
   </div>
          <div className={`w-full flex justify-center  p-0 sm:row-start-1 sm:row-end-2 row-start-2 row-end-3 sm:col-span-1 col-span-2`}>
          <Link  className={`w-full transition-all duration-500  p-3  border-solid  border-b-2 text-center hover:cursor-pointer ${mode?"border-[#BACFFF] hover:border-[rgb(5_0_55)]":"border-[rgb(4_0_43)] hover:border-[#e9e9ff]"}`} to="/">Home</Link>
            <Link  className={`w-full transition-all duration-500  p-3  border-solid  border-b-2 text-center hover:cursor-pointer ${mode?"border-[#BACFFF] hover:border-[rgb(5_0_55)]":"border-[rgb(4_0_43)] hover:border-[#e9e9ff]"}`} to="/settings">Settings</Link>
          </div>
          <div className={` flex sm:justify-end w-full justify-center`}>
            <button onClick={()=>{ fetch('/logout',{
      method:'POST',
    }).then(()=>{
     navigate('/login');
    })}} className={`w-[100px] transition-all duration-500 border-x-0  p-3  ${mode?"bg-[rgb(139_152_255)] hover:bg-[rgb(41,68,164)]":"bg-[rgb(24,19,84)] hover:bg-[rgb(24,19,200)] "} rounded-lg  `}>Logout</button>
          </div>
    </div>
  )
}
