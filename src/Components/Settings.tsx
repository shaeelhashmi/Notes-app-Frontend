import { FormEvent, useEffect, useState } from "react"
import InputTags from "./InputTags"
import NavBar from "./NavBar"
import axios from "axios"
import Loader from "./Loader"
import { useSelector } from "react-redux"
export default function Settings() {
    const mode=useSelector((state:any)=>state.Mode.Mode)
    const [error1,setError1]=useState('')
    const [error2,setError2]=useState('')
    const [popup,setPopup]=useState(false)
    const [popup2,setPopup2]=useState(false)
    const [Error3,setError3]=useState('')
    const [googleUser,setGoogleUser]=useState(false)
    const [loader,setLoader]=useState(true)
    const check=async()=>{
        const res=await axios.post("/checkaccount")
        setGoogleUser(res.data.message)
    }
        const handlePass=(e:React.FormEvent<HTMLInputElement>)=>{
        if(e.currentTarget.value.length>30){
          e.currentTarget.value = e.currentTarget.value.slice(0,30);
          setError1('Password cannot be more than 30 characters')
        }else{
          setError1('')
        }
      }
      const handleChange = (e:React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.value = e.currentTarget.value.toLowerCase();
        e.currentTarget.value = e.currentTarget.value.split(" ").join("");
        if(e.currentTarget.value.length>20){
          e.currentTarget.value = e.currentTarget.value.slice(0,20);
          setError2('Username cannot be more than 20 characters')
        }else{
          setError2('')
        }
       }
       useEffect(()=>{
      
        (async () => {
            await check(); 
            setLoader(false);
          })();
         setLoader(true)
         setError3(" ")
       },[])
  return (
    <>
    { loader?  <div className='flex items-center justify-center min-h-screen '><Loader/></div>:
    <div>
        {popup2&&<div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 ">
            <form onSubmit={async(e:FormEvent<HTMLFormElement>)=>{
                try{
                e.preventDefault();
                const FormData=e.currentTarget;
             
                
                if(googleUser){
                    const email=FormData.email.value;
                    if(email.length===0){
                        setError3('Email cannot be empty')
                        return;
                    }
                const res=await axios.delete("/deleteaccount",{data:{email:email}})
                setError3(res.data.message)
                location.reload();
                }else{
                    
                const password=FormData.password.value;
                if(password.length===0){
                    setError3('Email cannot be empty')
                    return;
                }
                    const res=await axios.delete("/deleteaccount",{data:{password:password}})
                    setError3(res.data.message)
                    location.reload();
                }
            }catch(err:any){
            
                setError3(err.response.data.message)
            }
            }}>
                <div className="w-[350px] h-[250px] bg-blue-400 p-2 rounded-lg">
                    
            {googleUser?<><p className="my-3 text-sm text-center">Enter your Email address to delete your account</p><InputTags name="email" label="Email:"
                type="email" placeholder="email" function={handlePass}></InputTags></>:<><p className="my-3 text-sm text-center">Enter your password to delete your account</p><InputTags name="password" label="Password:"
                type="password" placeholder="Password" function={handlePass}></InputTags></>}
                  <div className="h-5 my-2 text-center text-red-700">{Error3}</div>
                  <div className="flex items-center justify-center">
                    <button className="m-3 w-[200px] h-[40px] bg-[#FF010A] rounded-md hover:bg-[#fc232b] duration-500 transition-all">Confirm deletion</button>
                    <button className="m-3 w-[200px] h-[40px] bg-[#01ff5ad1] hover:bg-[#01ff5a] rounded-md duration-500 transition-all"
                    onClick={()=>{
                        setPopup2(false)
                    }}>Cancel</button>
                  </div>
                </div>
              
            </form>
            </div>}
    {
    popup&&<div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 ">
        <div className="w-[350px] h-[200px] bg-white p-4 rounded-lg">
            <p className="text-lg text-[#cc0000] my-4">Are you sure you want to delete your account?<br></br><span className="text-sm">Warning this action is irreversible</span></p>
            <div className="grid grid-cols-2 gap-3 my-3">
                <div className="flex justify-center">
                <button className="bg-[#FF010A] w-[100px] h-[30px] hover:bg-[#f4252c] duration-500 rounded-md"onClick={()=>{
                   setPopup(false)
                     setPopup2(true)
                }}>Yes</button>
                </div>
                <div className="flex justify-center">
                <button className="bg-[#0BBC46] w-[100px] h-[30px] hover:bg-[#2eb55b] rounded-md duration-500" onClick={()=>{
                    setPopup(false)
                }}>Cancel</button>
                </div>
            </div>
        

        </div>
        </div>}
    <NavBar></NavBar>
    <div className="grid grid-flow-row gap-4 mt-4">
            <h1 className={`mt-32 font-sans text-3xl font-bold text-center ${mode?"text-black":"text-white"}`}>Settings</h1>
        {!googleUser&&<div className={`sm:w-[500px] w-[300px] ${mode?"text-black":"text-white"} mx-auto my-12`}>
            <h1 className={`text-xl font-bold text-center `}>Change password</h1>
           <form onSubmit={async (e:FormEvent<HTMLFormElement>)=>{
                try{
          e.preventDefault();
          const FormData=e.currentTarget;
          const password=FormData.password.value;
            const password2=FormData.password2.value;
            const currPassword=FormData.currPassword.value;
            if(password.length===0){
                setError1('Password cannot be empty')
                return;
            }
            if(currPassword!==password2){
                setError1('Passwords do not match')
                return;
            }
            const res=await axios.patch("/updatepassword",{password:password,oldpass:currPassword})
            setError1(res.data.message)
        }catch(err){
           setError1("An error occured") 
        }
            }}>
                <InputTags name="currPassword" label="Current password:"
                type="password" placeholder="Password" function={handlePass}  border={mode?"border-b-2 border-solid border-black":" "}></InputTags>
                <InputTags name="password2" label="Confirm Password:"
                type="password" placeholder="Password" function={handlePass}  border={mode?"border-b-2 border-solid border-black":" "}></InputTags>
                <InputTags name="password" label="New password:"
                type="password" placeholder="Password" function={handlePass}  border={mode?"border-b-2 border-solid border-black":" "}></InputTags>
                <div className="h-5 my-5 text-center text-red-400">{error1}</div>
                <div className="flex justify-center my-5">
                
                <button type="submit" className={`w-[200px] h-[40px] mt-5 ${mode?"border-[#84a9ff] hover:bg-[#84a9ff]":"border-[#4C004B] hover:bg-[#4C004B]"} border-4 border-solid 
                 rounded-lg   duration-1000`}>Change password</button>
                 </div>
               
            </form>

        </div>}
                 <div className={`${mode?"text-black":"text-white"} sm:w-[500px] w-[300px]  mx-auto my-12`}>
            <h1 className={`text-xl font-bold text-center ${mode?"text-black":"text-white"}`}>Change username</h1>
            <form onSubmit={async(e:FormEvent<HTMLFormElement>)=>{
                try{
                e.preventDefault();
                const FormData=e.currentTarget;
                const username=FormData.userName.value;
                if(username.length===0){
                    setError2('Username cannot be empty')
                    return;
                }
                const res=await axios.patch("/updateusername",{username:username})
                setError2(res.data.message)
                location.reload();
            }catch(err){
                setError2("An error occured")
            }
            }}>
                <InputTags name="userName" label="Username:"
                type="text" placeholder="username" function={handleChange}  border={mode?"border-b-2 border-solid border-black":" "}></InputTags>
                <div className="h-5 my-5 text-center text-red-400">{error2}</div>
                <div className="flex justify-center my-5">
                <button type="submit" className={`w-[200px] h-[40px] mt-5 ${mode?"border-[#84a9ff] hover:bg-[#84a9ff]":"border-[#4C004B] hover:bg-[#4C004B]"} border-4 border-solid 
                 rounded-lg   duration-1000`}>Change username</button>
                 </div>
            </form>
        </div>
        <div className="flex flex-col justify-center w-full text-center border-t-4 border-red-800 border-solid">
            <h1 className="my-10 text-2xl text-center text-[#C60101]">Delete your account</h1>
            <div>
            <button className="w-[200px] h-[60px] bg-[#FF1201] my-11 text-white hover:bg-[#ff1c0c] rounded-lg duration-500 transition-all" onClick={()=>{setPopup(true)}}>Delete your account</button>
            </div>
        </div>
    </div>
    </div>
}
    </>
    
  )
}
