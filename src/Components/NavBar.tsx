import { useNavigate,Link } from "react-router-dom";
import { useEffect,useState } from "react";
import { useSelector } from 'react-redux'

export default function NavBar() {
  const selector1=useSelector((state:any)=>state.getUserName)
  const selector2=useSelector((state:any)=>state.Check)
  const [userName,setUsername]=useState('');
  useEffect(() => {
    if(selector2.value){
     console.log(selector1.name)
     setUsername(selector1.name);
   }
   },[selector1,selector2])
  const navigate=useNavigate();
  return ( 
    <div className='bg-[rgb(20_0_255)]  p-3 grid grid-flow-col text-white grid-cols-3 text-sm md:text-lg place-content-center  justify-items-center items-center gap-5 fixed top-0 w-full'>
      <div className="flex flex-col items-center w-full">
            <div className="w-full text-center "> {userName}</div>  
   </div>
          <div className={`w-full flex justify-center  p-0`}>
          <Link  className="w-full transition-all duration-500  p-3 border-b-2 border-solid hover:border-[#e9e9ff] border-[rgb(20_0_255)] text-center hover:cursor-pointer" to="/">Home</Link>
            <Link  className="w-full transition-all duration-500  p-3 border-b-2 border-solid hover:border-[#e9e9ff] border-[rgb(20_0_255)] text-center hover:cursor-pointer" to="/settings">Settings</Link>
          </div>
          <div className={` flex justify-end w-full`}>
            <button onClick={()=>{ fetch('/logout',{
      method:'POST',
    }).then(()=>{
     navigate('/login');
    })}} className="w-[100px] transition-all duration-500 border-x-0  p-3 border-b-2 border-solid hover:border-[#2c2cff] border-[rgb(20_0_255)]  bg-[rgb(48,31,234)] rounded-lg hover:bg-[rgb(95,81,255)] ">Logout</button>
          </div>
    </div>
  )
}
