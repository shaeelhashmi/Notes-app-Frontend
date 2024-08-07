import { useSelector } from "react-redux"
export default function Expand() {
  const mode = useSelector((state: any) => state.Mode.Mode);
return (
<>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none"  className="inline-block ">
<mask id="mask0_25_32" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="28">
<rect width="30" height="28" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_25_32)">
<path d="M15 17.4415C14.8333 17.4415 14.6771 17.4172 14.5313 17.3686C14.3854 17.3199 14.25 17.2373 14.125 17.1206L8.375 11.754C8.14583 11.5401 8.03125 11.2679 8.03125 10.9373C8.03125 10.6067 8.14583 10.3345 8.375 10.1206C8.60417 9.90675 8.89583 9.7998 9.25 9.7998C9.60417 9.7998 9.89583 9.90675 10.125 10.1206L15 14.6706L19.875 10.1206C20.1042 9.90675 20.3958 9.7998 20.75 9.7998C21.1042 9.7998 21.3958 9.90675 21.625 10.1206C21.8542 10.3345 21.9688 10.6067 21.9688 10.9373C21.9688 11.2679 21.8542 11.5401 21.625 11.754L15.875 17.1206C15.75 17.2373 15.6146 17.3199 15.4688 17.3686C15.3229 17.4172 15.1667 17.4415 15 17.4415Z" fill={mode?"black":"white"}/>
</g>
</svg>

</>
  )
}
