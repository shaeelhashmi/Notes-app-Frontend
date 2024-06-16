
import InputTags from './InputTags.tsx';
export default function Registration() {

  return (
    <>
    <div className='flex items-center justify-center min-h-screen'>
    <div className='w-[400px] h-[360px] p-3  rounded-3xl bg-opacity-100 text-white border-[#0C0B0C] border-solid border-4'>
      <h1 className='text-3xl text-center '>Sign Up</h1> 
      <form action="/new" method="post">
        <div className='flex flex-col'> 
          <InputTags name={"username"} label={"Username:"} type={"text"} placeholder={"Username"}></InputTags>
          <InputTags name={"password"} label={"Password: "} type={"password"} placeholder={"Password"}></InputTags>
        </div>
        <div className="flex">
        <button type="submit" className='w-[300px] h-[50px] bg-[#1e1c1e] mt-6 mx-auto  hover:bg-[#393639] transition-all duration-200 rounded-md'>SignUp</button>
        <a href="/auth/google" className='mx-auto mt-6 ms-2 bg-[#1e1c1e] w-[300px] h-[50px] text-center p-3 rounded-md hover:bg-[#393639] transition-all duration-200'>Login with Google</a>  
        </div>    
      </form>
      <a href="/login" className='text-[0.6rem] mt-7'>Already have an account? Login</a>
    </div>
  </div>
    </>
  );
}
