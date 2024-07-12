import { useNavigate } from "react-router-dom";
interface Props {
  username: String;
}
export default function NavBar(props:Props) {
  const navigate=useNavigate();
  return ( 
    <div className='bg-[rgb(20_0_255)]  p-3 grid grid-flow-col text-white grid-cols-3 text-sm md:text-lg place-content-center  justify-items-center items-center gap-5 fixed top-0 w-full'>
      <div className="flex flex-col items-center w-full">
            <div className="w-full text-center "> {props.username}</div>  
   </div>
         
          <div className={`w-full flex justify-center  p-0`}>
          <a  className="w-full transition-all duration-500  p-3 border-b-2 border-solid hover:border-[#e9e9ff] border-[rgb(20_0_255)] text-center hover:cursor-pointer">Home</a>
            <a  className="w-full transition-all duration-500  p-3 border-b-2 border-solid hover:border-[#e9e9ff] border-[rgb(20_0_255)] text-center hover:cursor-pointer">Settings</a>
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
