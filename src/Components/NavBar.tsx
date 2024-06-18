import { useEffect,useState } from "react";
import Bell from "./SVG/Bell";
import Expand from "./SVG/Expand.tsx";
interface Props {
  username: String;
}
export default function NavBar(props:Props) {
  const [showMenu, setShowMenu] = useState(false)
  useEffect (()=>{
    console.log(props.username)
  })
  return (
    
    <div className='bg-[#171616] h-[50px] p-3 flex flex-row text-white'>
      <div className="flex-row px-2 text-center flex-2 ms-3  w-[150px] " >
        <div className="  w-[56px] hover:cursor-pointer" onClick={()=>{setShowMenu(!showMenu)}}>{props.username}<Expand></Expand></div> 
        {
  
          <div className={`bg-[#171616] mt-2 border-2 border-t-0 rounded-md rounded-t-none border-black relative right-4 ${showMenu ? "scale-y-100 " : "scale-y-0 "} transition-all duration-500 origin-top`}>
          <div className={`mt-2 border-2 hover:border-white border-x-0 border-[#171616] transition-all duration-500 border-t-0 mb-2`}>
            <button>Logout</button>
          </div>
          <div className={`mt-2 border-2 hover:border-white border-x-0 border-[#171616] transition-all duration-500 border-t-0 mb-2`}>
            <button>Settings</button>
          </div>
        </div>
}
   </div>
      
      <div className="flex items-center justify-center mx-auto text-center h-30 hover:cursor-pointer">Sort<Expand></Expand></div>
      <div className="flex me-3 hover:cursor-pointer"><Bell></Bell></div>
    </div>
  )
}
