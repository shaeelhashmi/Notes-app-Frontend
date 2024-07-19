import { useSelector } from "react-redux"
export default function VerticalElips() {
  const mode=useSelector((state:any)=>state.Mode.Mode)
  return (
       <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 24 24" fill={mode?"black":"white"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis-vertical"><circle  cy="12" r="1"/><circle  cy="5" r="1"/><circle  cy="19" r="1"/></svg>
    </div>
  )
}
