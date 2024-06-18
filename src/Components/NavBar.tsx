import Bell from "./SVG/Bell";
import Expand from "./SVG/Expand.tsx";

export default function NavBar() {
  return (
    <div className='bg-[#171616] h-[50px] p-3 flex flex-row'>
      <div className="flex items-center justify-center mx-auto text-center text-white h-30 hover:cursor-pointer">Sort<Expand></Expand></div>
      <div className="flex me-3 hover:cursor-pointer"><Bell></Bell></div>
    </div>
  )
}
