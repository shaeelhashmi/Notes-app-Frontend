import { useParams } from 'react-router-dom'
import NavBar from './NavBar'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import VerticalElips from './SVG/VerticalElips'
export default function ShowNotes() {
    const selector1=useSelector((state:any)=>state.getUserName)
    const selector2=useSelector((state:any)=>state.Check)
    const [userName,setUserName]=useState('')
    const {id}= useParams()
    console.log(id)
    const dummy={
        category: "agag",
        Notes: [
            {
                title: "gfsgfs",
                content: "gsafgfsgfsg",
                SubmissionDate: "2024-07-11T16:09:34.255Z",
                _id: "669003be2c671acfb0decd62"
            }
        ],
        _id: "669003be2c671acfb0decd61"
    } 
    useEffect(()=>{
        if(selector2.value){
            setUserName(selector1.name);
          }
    },[selector1,selector2]) 
  return (
    <>
        <NavBar username={userName}></NavBar>
        <div className='mt-32 text-white mx-auto w-[80%]'>
        <h1 className='text-3xl'>{dummy.category}</h1>
        <div className='w-[100%]  bg-[#0400ff] mt-4 rounded-[2%] p-6 h-[500px]'>
         <div className='grid grid-cols-3 p-4'>
         <div className='items-center col-start-2 col-end-3 text-2xl font-bold text-center '>{dummy.Notes[0].title}</div>
            <div className='flex justify-end me-4'><VerticalElips></VerticalElips></div>
            </div>   
       
        <div className='overflow-y-auto h-[300px] col-span-3 my-6 mx-7'> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac risus sem. Vestibulum a est lorem. Nam sollicitudin mollis risus, viverra tempor lorem. Proin porttitor ex sit amet magna euismod volutpat. Suspendisse tellus orci, lobortis et mattis a, pulvinar nec nunc. Nulla eu pharetra magna. Donec tellus dui, hendrerit non nunc in, tempor aliquet elit. Vestibulum urna neque, scelerisque id ultrices eu, ultrices non justo. Morbi ut fermentum elit, eget aliquam nunc. Donec est urna, tempus vitae viverra a, sagittis eget nunc. Suspendisse interdum ultricies enim vel vehicula. Sed a diam sit amet metus vehicula sollicitudin. Nullam vehicula enim et justo convallis vehicula. Proin euismod fermentum nisi eget sollicitudin. Praesent pellentesque risus ut dignissim facilisis. Donec ac aliquet lectus.

Maecenas eget justo risus. Mauris quis maximus nulla. Sed odio tortor, elementum ac orci id, molestie molestie mauris. Nunc ut justo et neque dapibus mattis eget rutrum odio. Suspendisse nisi libero, accumsan non magna eget, auctor efficitur tellus. Cras pulvinar porta neque eu egestas. Nullam accumsan dolor vitae dolor auctor, ut placerat velit finibus. Etiam rutrum quam vel pharetra sollicitudin. Vestibulum fringilla nibh at tristique porttitor. Aliquam volutpat, sem at pretium facilisis, ipsum ex accumsan enim, et imperdiet neque elit et nisi. Curabitur molestie aliquet mauris ut pellentesque.

Quisque lobortis purus eu magna laoreet, id accumsan ligula hendrerit. Morbi commodo enim a arcu dictum finibus. Morbi tincidunt quam sit amet vestibulum volutpat. Praesent facilisis, justo at tristique viverra, odio diam sollicitudin felis, quis semper nibh massa vel leo. Integer quis metus nec augue euismod accumsan a eget nisl. InLorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac risus sem. Vestibulum a est lorem. Nam sollicitudin mollis risus, viverra tempor lorem. Proin porttitor ex sit amet magna euismod volutpat. Suspendisse tellus orci, lobortis et mattis a, pulvinar nec nunc. Nulla eu pharetra magna. Donec tellus dui, hendrerit non nunc in, tempor aliquet elit. Vestibulum urna neque, scelerisque id ultrices eu, ultrices non justo. Morbi ut fermentum elit, eget aliquam nunc. Donec est urna, tempus vitae viverra a, sagittis eget nunc. Suspendisse interdum ultricies enim vel vehicula. Sed a diam sit amet metus vehicula sollicitudin. Nullam vehicula enim et justo convallis vehicula. Proin euismod fermentum nisi eget sollicitudin. Praesent pellentesque risus ut dignissim facilisis. Donec ac aliquet lectus.

Maecenas eget justo risus. Mauris quis maximus nulla. Sed odio tortor, elementum ac orci id, molestie molestie mauris. Nunc ut justo et neque dapibus mattis eget rutrum odio. Suspendisse nisi libero, accumsan non magna eget, auctor efficitur tellus. Cras pulvinar porta neque eu egestas. Nullam accumsan dolor vitae dolor auctor, ut placerat velit finibus. Etiam rutrum quam vel pharetra sollicitudin. Vestibulum fringilla nibh at tristique porttitor. Aliquam volutpat, sem at pretium facilisis, ipsum ex accumsan enim, et imperdiet neque elit et nisi. Curabitur molestie aliquet mauris ut pellentesque.

Quisque lobortis purus eu magna laoreet, id accumsan ligula hendrerit. Morbi commodo enim a arcu dictum finibus. Morbi tincidunt quam sit amet vestibulum volutpat. Praesent facilisis, justo at tristique viverra, odio diam sollicitudin felis, quis semper nibh massa vel leo. Integer quis metus nec augue euismod accumsan a eget nisl. In</div>
    
<div className='my-6 text-right'>Submitted on:<i className='text-sm font-thin mx-7'>{dummy.Notes[0].SubmissionDate}</i></div>
        </div>
   
        </div>
     
    </>
  )
}
