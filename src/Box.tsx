interface BoxProps {
    Title: String;
    description: String;
    
}
export default function Box(props:BoxProps) {
  return (
    <>
         <div className='bg-[#055526] w-[200px] h-[200px] rounded-xl p-3 m-3'>
      <div className='text-center'>
        {props.Title}
      </div>
      <div className='text-[0.75rem]'>
      {props.description}
      </div>
    </div>
    </>
  )
}
