import {useState,useEffect} from 'react'
import img from "../assets/bg.png"

export default function Side() {
    const [change,setchange]=useState("true")
    const [text,setText]=useState('Create notes')
    
  const texts=['Create notes','Edit notes','Delete notes']

  let prevNum:number=0;
  let setNum:number=0
    useEffect(() => {
        const Promise1=()=>new Promise((resolve,reject)=>{  
          try{  setTimeout(() => {
          resolve(setchange("false"))  
        },3000)}
        catch(e){
          reject(e)
        }})
        const Promise2=()=>new Promise((resolve,reject)=>{  
          try{  setTimeout(() => {
          resolve(setchange("null"))  
        },500)}
        catch(e){
          reject(e)
        }})
        const intervalId = setInterval(async() => {
          setchange("true")
          setNum=Math.floor(Math.random() * texts.length)
          while(prevNum===setNum){
          if(prevNum===setNum){
            setNum=Math.floor(Math.random() * texts.length)
          }
        }
        await Promise1();
        await Promise2();
          setText(texts[setNum]); 
          prevNum=setNum;   
        }, 5000);
        setNum=Math.floor(Math.random() * texts.length)
        setText(texts[setNum]);
        prevNum=setNum;
        return () => clearInterval(intervalId);
      },[])
  return (
    <div className='flex-col items-center justify-center hidden text-black lg:flex ' style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <h1 className='my-3 font-serif text-5xl '>Notes App</h1>
    <div className={`my-2 text-lg transition-all duration-500 ${change==="true"?'translate-x-0 opacity-100':'translate-x-minus-full  opacity-0'} text-black ${change==="null"?" translate-x-full opacity-0":"  "} animate2`} >{text}</div>
  </div>
  )
}
