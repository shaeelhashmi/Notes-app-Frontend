import { useState } from "react";
import Bell from "./SVG/Bell";
import Expand from "./SVG/Expand.tsx";
interface Props {
  username: String;
}
export default function NavBar(props:Props) {
  const [showMenu, setShowMenu] = useState(false)
  return ( 
    <div className='bg-[#171616] h-[50px] p-3 grid grid-flow-col text-white grid-cols-3 text-[0.8rem] md:text-sm'>
      <div className="w-fit" >
        <div className=" hover:cursor-pointer" onClick={()=>{setShowMenu(!showMenu)}}>{props.username}<Expand></Expand></div> 
    

          <div className={`bg-[#171616] mt-2 border-2 border-t-0 rounded-md rounded-t-none border-black relative right-4 ${showMenu ? "scale-y-100 " : "scale-y-0 "} transition-all duration-500 origin-top ms-4 items-center flex justify-center flex-col`}>
          <div className={`mt-2   mb-2 w-full flex justify-center`}>
            <button onClick={()=>{ fetch('/logout',{
      method:'POST',
    }).then(()=>{
      window.location.href='/login'
    })}} className="w-full hover:border-white border-x-0 border-[#171616] transition-all duration-500 border-t-0 border-2">Logout</button>
          </div>
          <div className={`mt-2 border-2 hover:border-white border-x-0 border-[#171616] transition-all duration-500 border-t-0 mb-2 w-full flex justify-center`}>
            <button  className="w-full hover:border-white border-x-0 border-[#171616] transition-all duration-500 border-t-0 border-2">Settings</button>
          </div>
        </div>

   </div>
      
      <div className="mx-auto text-center hover:cursor-pointer ">Sort<Expand></Expand></div>
      <div className="flex justify-end me-3 hover:cursor-pointer"><Bell></Bell></div>
    </div>
  )
}
