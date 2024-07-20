import InputTags from './InputTags.tsx'
import {Link} from 'react-router-dom'
import React,{ FormEvent,useEffect,useState } from 'react'
import Google from './SVG/Google.tsx'
import Side from './Side.tsx'
import { useSelector } from 'react-redux'
export default function LoginForm() {
  const [error,setError]=useState('')
  const mode=useSelector((state:any)=>state.Mode.Mode)

  const IsEmpty=(username:String,password:String):boolean=>{
    if(username.length===0 || password.length===0){
      return true
    }
    return false
  } 
  const IsEmptySpaces=(username:String):boolean=>{
    if(username.trim().length===0){
      return true
    }
    return false;
  }
  const SubmitForm:React.FormEventHandler<HTMLFormElement> = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form=e.currentTarget;
  let username = (form.elements.namedItem('username') as HTMLInputElement).value;
  let password = (form.elements.namedItem('password') as HTMLInputElement).value;
  if(IsEmpty(username,password)){
    setError('Please fill all the fields')
    return;
  }
  if(IsEmptySpaces(username)){
    setError('Username cannot be empty spaces')
    return;
  }
  fetch('/login',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      username:username,
      password:password
    })
  }).then(res => res.json())
  .then(data => {
    setError(data.message)
    if(data.message==="Authenticated")
      {
        location.reload();
      }
  })
  }
  useEffect(() => {
    setError('');
  },[])
    const handlePass=(e:React.FormEvent<HTMLInputElement>)=>{
      if(e.currentTarget.value.length>30){
        e.currentTarget.value = e.currentTarget.value.slice(0,30);
        setError('Password cannot be more than 30 characters')
      }else{
        setError('')
      }
    }
  const handleChange = (e:React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.toLowerCase();
    e.currentTarget.value = e.currentTarget.value.split(" ").join("");
    if(e.currentTarget.value.length>20){
      e.currentTarget.value = e.currentTarget.value.slice(0,20);
      setError('Username cannot be more than 20 characters')
    }else{
      setError('')
    }
   }
  return (
    <div className='grid min-h-screen grid-cols-1 lg:grid-cols-2 color place-content-center ' >
    <div className={` ${mode?'text-black':'text-white'}  p-14 w-[550px]   h-full mx-auto`}>
    <h1 className='font-serif text-3xl text-center lg:hidden'>Welcome to Notes App 
        <br></br><span className='text-base'>An easy way to manage your notes Signup or login to continue</span></h1>
      <div className='flex'>
      <a href="/auth/google/callback" className={`mx-auto mt-6  ${mode?' bg-blue-300 ':'bg-[rgb(28,0,126)]'} w-[300px] h-[50px] text-center p-3 rounded-md ${mode?"hover:bg-blue-200":"hover:bg-[rgb(28,0,200)]"} transition-all duration-500 ${mode?"text-black":"text-white"} justify-self-center`}><Google></Google><span className='ms-5'>Login with Google</span></a>
      </div>
      <h1 className='font-serif text-3xl text-center mt-11'> Login</h1> 
      <form action="/login" method="post" onSubmit={SubmitForm}>
        <div className='flex flex-col'> 
          <InputTags name={"username"} label={"Username:"} type={"text"} placeholder={"Username"} function={handleChange} border={mode?"border-b-2 border-solid border-black":" "}></InputTags>
          <InputTags name={"password"} label={"Password: "} type={"password"} placeholder={"Password"} function={handlePass} border={mode?"border-b-2 border-solid border-black":" "}></InputTags>
        </div>
        <div className='h-6 mt-5 text-sm text-red-700'>{error}</div>
        <div className="flex">      
        <button type="submit" className={`mx-auto mt-6  ${mode?' bg-blue-300 ':'bg-[rgb(28,0,126)]'} w-[300px] h-[50px] text-center p-3 rounded-md ${mode?"hover:bg-blue-200":"hover:bg-[rgb(28,0,200)]"} transition-all duration-500 ${mode?"text-black":"text-white"} justify-self-center`}>Login</button>
     
        </div>    
      </form>
      <Link to="/signup" className='text-[0.6rem] mt-10'>Dont have an account? Signup</Link>  
    </div>
  <Side></Side>
  </div>
  )
}
