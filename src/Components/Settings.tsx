import { FormEvent, useState } from "react"
import InputTags from "./InputTags"
import NavBar from "./NavBar"
import axios from "axios"
export default function Settings() {
    const [error1,setError1]=useState('')
    const [error2,setError2]=useState('')
  return (
    <>
    <NavBar></NavBar>
    <div className="grid grid-flow-row gap-4 mt-4">
            <h1 className="mt-32 font-sans text-3xl font-bold text-center text-white">Settings</h1>
        <div className="w-[500px] text-white mx-auto my-12">
            <h1 className="text-xl font-bold text-center">Change password</h1>
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
            if(password!==password2){
                setError1('Passwords do not match')
                return;
            }
            const res=await axios.patch("/updatepassword",{password:password,oldpass:currPassword})
            setError1(res.data.message)
        }catch(err){
           setError1("An error occured") 
        }
            }}>
                <InputTags name="password" label="New password:"
                type="password" placeholder="Password"></InputTags>
                <InputTags name="password2" label="Confirm Password:"
                type="password" placeholder="Password"></InputTags>
                <InputTags name="currPassword" label="Current password:"
                type="password" placeholder="Password"></InputTags>
                <div className="h-5 my-5 text-center text-red-400">{error1}</div>
                <div className="flex justify-center my-5">
                
                <button type="submit" className="w-[200px] h-[40px] mt-5 border-[#4C004B] border-4 border-solid 
                 rounded-lg hover:bg-[#4C004B]  duration-1000 ">Change password</button>
                 </div>
               
            </form>
        </div>
                 <div className="w-[500px] text-white mx-auto my-12">
            <h1 className="text-xl font-bold text-center">Change username</h1>
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
                type="text" placeholder="username" function={   (e:React.FormEvent<HTMLInputElement>) => {
                    e.currentTarget.value = e.currentTarget.value.toLowerCase();
                    e.currentTarget.value = e.currentTarget.value.split(" ").join("");
                   }}></InputTags>
                <div className="h-5 my-5 text-center text-red-400">{error2}</div>
                <div className="flex justify-center my-5">
                <button type="submit" className="w-[200px] h-[40px] mt-5 border-[#4C004B] border-4 border-solid 
                 rounded-lg hover:bg-[#4C004B]  duration-1000 ">Change username</button>
                 </div>
            </form>
        </div>
    </div>
    </>
  )
}
