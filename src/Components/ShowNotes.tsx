import { useParams } from 'react-router-dom'
import NavBar from './NavBar'
import { useEffect, useState } from 'react'
import VerticalElips from './SVG/VerticalElips'
import axios from 'axios'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'
import InputTags from './InputTags'
import {ChangeEvent,FormEvent,FormEventHandler} from 'react'
interface Data{
  title:string,
  content:string,
  SubmissionDate:Date,
  _id:string
}
export default function ShowNotes() {
  const nav=useNavigate()
  const convertDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }
    const [showMenu,setShowMenu]=useState(true)
    const [loader,setLoader]=useState(true)
    const [data,setData]=useState<Data>({ title: '', content: '', SubmissionDate: new Date(), _id: '' });
    const [show,setShow]=useState(false)
    const [error,setError]=useState('')
    const {id}= useParams()
    const CheckLetter=(e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
      const size:number=e.currentTarget.value.length;
      let value:string=e.currentTarget.value;
   for(let i=0;i<size-1;i++){
      if(value[i]===" " && value[i+1]===" "){
        value=value.slice(0,i)+value.slice(i+1);
        e.currentTarget.value=value;
      }
   }
    if(value[0]===" "){
      value=value.slice(1);
      e.currentTarget.value=value;
     }
    }
    const CreateNote:FormEventHandler<HTMLFormElement>= async (e:FormEvent<HTMLFormElement>) => {
      interface data{
        category?:String;
        title:String;
        description:String;
        id:string;
      }
       const form=e.currentTarget;
       e.preventDefault();
       const category = (form.elements.namedItem('Category') as HTMLInputElement).value;
       const title = (form.elements.namedItem('Title') as HTMLInputElement).value;
       const description = (form.elements.namedItem('description') as HTMLInputElement).value;
       let SendData:data;
       if(title.trim().length===0 || description.trim().length===0){
         setError('Please fill all the fields');
         return;
       }
       if(category.trim().length===0){
        try{
          SendData={title:title,description:description,id:data._id}
          const res=await axios.patch('/upadteNote',SendData);
          setError(res.data.message)
          location.reload();
        }
        catch(err){
          setError('Error in creating note')
        }
         return;
       }
       SendData={category:category,title:title,description:description,id:data._id}
        try{
          const res=await axios.patch('/upadteNote',SendData);
          setError(res.data.message)
          nav("/")
          return;
        }
        catch(err){
          setError('Error in creating note')
          return;
        }
    }
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.post(`/notes`, { id: id }, { headers: { 'Content-Type': 'application/json' } });
            setData(res.data);
          } catch (err) {
            console.log(err);
          } finally {
            setLoader(false);
          }
        };
        fetchData();
      }, [id]);
      useEffect(() => {
        console.log("Updated data:", data);
      }, [data]);
  return (
    <>
    {loader?<div className='absolute left-[50%] top-[50%] bottom-[50%] right-[50%]'><Loader/></div>:
    <>
    <NavBar>    
    </NavBar>
    {show&&<div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="p-5 w-96 bg-[rgb(0,17,255)] rounded-xl">
            <div className='h-3 text-2xl text-center text-white'>Edit Note</div>
            <form className="text-white" onSubmit={CreateNote}>
              <InputTags
                name="Category"
                label="Category: (optional) "
                type="text"
                placeholder="Category"
                function={CheckLetter}
                required={false}
              />
              <InputTags
                name="Title"
                label="Title: "
                type="text"
                placeholder="Title"
                function={CheckLetter}
                required={true}
              />
              <div className="flex flex-col">
                <div className="flex items-center mt-8">
                  <label htmlFor="description" className="w-1/3 text-lg text-white">
                    Description:
                  </label>
                  <textarea
                    className="h-26 w-[63%] p-3 text-sm bg-white border-l-0 border-r-0 border-t-0 border-b text-black placeholder-black  resize-none min-h-20"
                    placeholder="Description"
                    name="description"
                    required
                    onChange={CheckLetter}
                  />
                </div>
              </div>
              <div className='h-5 mt-2 text-sm text-red-400'>{error}</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <button
                    type="submit"
                    className="mt-8 bg-[#0a0077] w-[150px] h-[50px]  rounded-lg  hover:bg-[#1100d0] transition-all duration-500"
                  >
                    Submit
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="mt-8 bg-[#c30000] w-[150px] h-[50px]  rounded-lg  hover:bg-[#ff1f1f] transition-all duration-500"
                    onClick={() => {
                      setShow(!show);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>}
        <div className='mt-32 text-white mx-auto w-[80%]'>
        {/* <h1 className='text-3xl'>{data.category}</h1> */}
        <div className='w-[100%]  bg-[#0400ff] mt-4 rounded-[2%] p-6 h-[540px]'>
         <div className='grid grid-cols-3 p-4'>
         <div className='items-center col-start-2 col-end-3 text-2xl font-bold text-center '>{data.title}</div>
            <div className='flex justify-end me-4'><button className='w-2' onClick={()=>{
                setShowMenu(!showMenu)
            }}><VerticalElips></VerticalElips></button>
            
            </div>
            <div className={`col-span-3 col-start-3 col-end-4 ${showMenu?"scale-y-0":"scale-y-100"} duration-1000 transition-all origin-top h-5 
 rounded-full me-4 w-[200px] justify-self-end`}>
            <div className={`flex justify-center   me-4 } duration-700 transition-all origin-top  bg-blue-700 p-2 w-full h-16 `}><button className='w-full p-2 text-center transition-all duration-700 border-b-2 border-blue-700 border-solid hover:border-white' onClick={()=>{
              setShow(!show)
            }}>Edit note</button></div>
            <div className={`flex justify-center    me-4  duration-700 transition-all origin-top  bg-blue-700 p-2 w-full h-16 rounded-b-lg `}><button className='w-full p-2 text-center transition-all duration-700 border-b-2 border-blue-700 border-solid hover:border-white' onClick={async()=>{
             try
             {
             await axios.delete('/DeleteNote',{ data: { id: data._id } })
             nav("/")
             }catch(err){
              console.log(err)
             }
            }}>Delete note</button></div>
            </div>
            </div>   
        <div className='overflow-y-auto h-[300px] col-span-3 my-6 mx-7' onClick={()=>{
            setShowMenu(true)
        }}> {data.content}</div>
    
<div className='text-right '>Last updated:<i className='text-sm font-thin mx-7'>{convertDate(new Date (data.SubmissionDate))}</i></div>
        </div>
   
        </div>
        </>}
        
     
    </>
  )
}
