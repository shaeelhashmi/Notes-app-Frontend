import InputTags from './InputTags.tsx'
import {Link} from 'react-router-dom'
import React,{ FormEvent,useState } from 'react'
export default function Registration() {
  const [error,setError]=useState('')
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
  })
  }
  return (
    <div className='flex items-center justify-center min-h-screen'>
    <div className='w-[400px] h-[360px] p-3  rounded-3xl bg-opacity-100 text-white border-[#0C0B0C] border-solid border-4'>
      <h1 className='text-3xl text-center '>User Login</h1> 
      <form action="/login" method="post" onSubmit={SubmitForm}>
        <div className='flex flex-col'> 
          <InputTags name={"username"} label={"Username:"} type={"text"} placeholder={"Username"}></InputTags>
          <InputTags name={"password"} label={"Password: "} type={"password"} placeholder={"Password"}></InputTags>
        </div>
        <div className='h-6 mt-5 text-sm text-red-700'>{error}</div>
        <div className="flex">
          
        <button type="submit" className='w-[300px] h-[50px] bg-[#1e1c1e] mt-6 mx-auto  hover:bg-[#393639] transition-all duration-200 rounded-md'>Login</button>
        <a href="/auth/google/callback" className='mx-auto mt-6 ms-2 bg-[#1e1c1e] w-[300px] h-[50px] text-center p-3 rounded-md hover:bg-[#393639] transition-all duration-200'>Login with Google</a>  
        </div>    
      </form>
      <Link to="/signup" className='text-[0.6rem] mt-10'>Already have an account? Signup</Link>
      
    </div>
  </div>
  )
}
