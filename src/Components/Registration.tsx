
import { Link } from 'react-router-dom';
import InputTags from './InputTags.tsx';
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
  const Submit:React.FormEventHandler<HTMLFormElement> = (e:FormEvent<HTMLFormElement>) => {
    const Form=e.currentTarget;
    let username = (Form.elements.namedItem('username') as HTMLInputElement).value;
    let password = (Form.elements.namedItem('password') as HTMLInputElement).value;
    e.preventDefault();
    if(IsEmpty(username,password)){
      setError('Please fill all the fields')
      return;
    }
    if(IsEmptySpaces(username)){
      setError('Username cannot be empty spaces')
      return;
    }
  }

  return (
    <>
    <div className='flex items-center justify-center min-h-screen'>
    <div className='w-[400px] h-[360px] p-3  rounded-3xl bg-opacity-100 text-white border-[#0C0B0C] border-solid border-4'>
      <h1 className='text-3xl text-center '>Sign Up</h1> 
      <form action="/register" method="post" onSubmit={Submit}>
        <div className='flex flex-col'> 
          <InputTags name={"username"} label={"Username:"} type={"text"} placeholder={"Username"}></InputTags>
          <InputTags name={"password"} label={"Password: "} type={"password"} placeholder={"Password"}></InputTags>
        </div> 
        <div className='h-6 mt-5 text-sm text-red-700'>{error}</div>
        <div className="flex">
        <button type="submit" className='w-[300px] h-[50px] bg-[#1e1c1e] mt-6 mx-auto  hover:bg-[#393639] transition-all duration-200 rounded-md'>SignUp</button>
        <a href="/auth/google" className='mx-auto mt-6 ms-2 bg-[#1e1c1e] w-[300px] h-[50px] text-center p-3 rounded-md hover:bg-[#393639] transition-all duration-200'>Login with Google</a>  
        </div>    
      </form>
      <Link to="/login" className='text-[0.6rem] mt-7'>Already have an account? Login</Link>
    </div>
  </div>
    </>
  );
}
