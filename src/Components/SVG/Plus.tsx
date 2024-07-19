import { useSelector } from "react-redux"
export default function Plus() {
  const mode=useSelector((state:any)=>state.Mode.Mode);
  return (
    <div className="inline-block me-14">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 30" fill="none">
<line x1="15.5" x2="15.5" y2="30" stroke={`${mode?"black":"white"}`}/>
<line y1="16.5" x2="30" y2="16.5" stroke={`${mode?"black":"white"}`}/>
</svg>
    </div>
  )
}
