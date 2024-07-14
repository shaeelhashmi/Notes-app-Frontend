import InputTags from './InputTags.tsx'
import {Link} from 'react-router-dom'
import React,{ FormEvent,useEffect,useState } from 'react'
import Google from './SVG/Google.tsx'
import img from '../assets/bg.jpeg'
export default function Registration() {
  console.log(img)
  const [error,setError]=useState('')
  const [text,setText]=useState('Create notes')
  const texts=['Create notes','Edit notes','Delete notes']
  const [change,setchange]=useState(texts[Math.floor(Math.random() * texts.length)])
  let prevNum:number=0;
  let setNum:number=0
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
    const intervalId = setInterval(() => {  
      setchange("true");
      setNum=Math.floor(Math.random() * texts.length)
      while(prevNum===setNum){
      if(prevNum===setNum){
        setNum=Math.floor(Math.random() * texts.length)
      }
    }
      setText(texts[setNum]); 
      prevNum=setNum;
      setTimeout(() => {
        setchange("false")  
      },3500)
      setTimeout(() => {
        setchange("null")
      },4000)
      
    }, 5000);
    setNum=Math.floor(Math.random() * texts.length)
    setText(texts[setNum]);
    prevNum=setNum;
    setError('');
    return () => clearInterval(intervalId);
  },[])
  const handleChange = (e:React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.toLowerCase();
    e.currentTarget.value = e.currentTarget.value.split(" ").join("");
   }
  return (
    <div className='grid min-h-screen grid-cols-2' style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className=' text-white  p-14 w-[550px]  border-black border-dotted border-r-2 h-full'>
      <div className='flex '>
      <a href="/auth/google/callback" className='mx-auto mt-6  bg-[#0B032D] w-[300px] h-[50px] text-center p-3 rounded-md hover:bg-[#11044d] transition-all duration-500 text-white justify-self-center'><Google></Google><span className='ms-5'>Login with Google</span></a>
      </div>
      <h1 className='text-3xl text-center mt-11'> Login</h1> 
      <form action="/login" method="post" onSubmit={SubmitForm}>
        <div className='flex flex-col'> 
          <InputTags name={"username"} label={"Username:"} type={"text"} placeholder={"Username"} function={handleChange}></InputTags>
          <InputTags name={"password"} label={"Password: "} type={"password"} placeholder={"Password"}></InputTags>
        </div>
        <div className='h-6 mt-5 text-sm text-red-700'>{error}</div>
        <div className="flex">      
        <button type="submit" className='w-[300px] h-[50px] bg-[#0B032D] mt-6 mx-auto  transition-all duration-500 rounded-md text-white hover:bg-[#11044d]'>Login</button>
     
        </div>    
      </form>
      <Link to="/signup" className='text-[0.6rem] mt-10'>Already have an account? Signup</Link>  
    </div>
    <div className='flex flex-col items-center justify-center text-black '>
      <h1 className='my-3 text-5xl'>Notes App</h1>
      <div className={`my-2 text-lg transition-all duration-500 ${change==="true"?'translate-x-0 opacity-100':'translate-x-minus-full  opacity-0'} text-black ${change==="null"?" translate-x-full opacity-0":" "}`}>{text}</div>
    </div>
  </div>
  )
}
