import InputTags from "./InputTags"
import NavBar from "./NavBar"
export default function Settings() {
  return (
    <>
    <NavBar></NavBar>
    <div className="grid grid-flow-row gap-4 mt-4">
            <h1 className="mt-32 font-sans text-3xl font-bold text-center text-white">Settings</h1>
        <div className="w-[500px] text-white mx-auto my-12">
            <h1 className="text-xl font-bold text-center">Change password</h1>
            <form action="">
                <InputTags name="password" label="New password:"
                type="text" placeholder="Password"></InputTags>
                <InputTags name="password2" label="Confirm Password:"
                type="text" placeholder="Password"></InputTags>
                <InputTags name="currPassword" label="Current password:"
                type="text" placeholder="Password"></InputTags>
                <div className="h-5 my-5 text-center text-red-400">Internal server error</div>
                <div className="flex justify-center my-5">
                
                <button type="submit" className="w-[200px] h-[40px] mt-5 border-[#4C004B] border-4 border-solid 
                 rounded-lg hover:bg-[#4C004B]  duration-1000 ">Change password</button>
                 </div>
               
            </form>
        </div>
                 <div className="w-[500px] text-white mx-auto my-12">
            <h1 className="text-xl font-bold text-center">Change username</h1>
            <form action="">
                <InputTags name="userName" label="Username:"
                type="text" placeholder="username"></InputTags>
                <div className="h-5 my-5 text-center text-red-400">Internal server error</div>
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
