
import { useSelector } from "react-redux"
export default function page404() {
  const mode=useSelector((state:any)=>state.Mode.Mode)
  return (
    <div className={`flex flex-col items-center justify-center h-screen space-y-4 ${mode?"text-black":"text-white"}`}>
    <h1 className="text-2xl font-semibold">Oops! Wrong page</h1>
    <h1 className="text-5xl font-bold">404 Not Found</h1>
  </div>
  )
}

