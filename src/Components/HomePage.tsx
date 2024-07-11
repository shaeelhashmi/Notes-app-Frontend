import { FormEvent, FormEventHandler, useEffect, useState, ChangeEvent } from 'react';
import InputTags from './InputTags';
import NavBar from './NavBar';
import Plus from './SVG/Plus';
import Loader from './Loader.tsx'
import Box from './Box.tsx';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function HomePage() {
  const selector1=useSelector((state:any)=>state.getUserName)
  const selector2=useSelector((state:any)=>state.Check)
  const navigate=useNavigate();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Add 1 day
  const minDate = tomorrow.toISOString().split('T')[0]; // Get tomorrow's date in YYYY-MM-DD format
  const [showPopup, setShowPopup] = useState(false);
  const [username, setUsername] = useState(''); // State to store username
  const [loader, setLoader] = useState(true); // State to store loader
  const [error, setError] = useState(''); // State to store error messages
  const [notes,setNotes]=useState<any>([]); // State to store notes
 // State to store fetch
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
  let Notes:any[];
  const checkLogin = async () => {
    try {
        Notes=await getDateTime();
        setNotes(Notes); // Update the notes state with the fetched data
      
    } catch {
      setLoader(true);
       navigate('/login');
    } 
  };
  const CreateNote:FormEventHandler<HTMLFormElement>= async (e:FormEvent<HTMLFormElement>) => {
    interface data{
      category:String;
      title:String;
      description:String;
      CompletionDate?:String;
    }
    const form=e.currentTarget;
    e.preventDefault();
    const category = (form.elements.namedItem('Category') as HTMLInputElement).value;
    const title = (form.elements.namedItem('Title') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLInputElement).value;
    const CompletionDate = (form.elements.namedItem('CompletionDate') as HTMLInputElement).value;
    let data:data;
    if(title.trim().length===0 || category.trim().length===0 || description.trim().length===0){
      setError('Please fill all the fields');
      return;
    }
      data={category:category.trim(),title:title.trim(),description:description.trim(),CompletionDate:CompletionDate}
    try{
    const res=await fetch('/addnote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const response = await res.json();
    setError(response.message);
    location.reload();

  }
  catch(error){
    setError('Internal server Error')
  }
  }
 
  const getDateTime = async ():Promise<any> => {
    try{
      let res=await fetch("/userdata");
      if(!res.ok){
        navigate('/login');
      }
    let value=await res.json();
    return value;
    }catch(error){
     navigate('/login');
    }
    
  }
  useEffect(() => {
   if(selector2.value){
    setUsername(selector1.name);
  }
  },[selector1,selector2])
  useEffect(() => {
   
    (async () => {
      await checkLogin();
      
      setLoader(false);
    })();
    checkLogin();
    setError('');
    setShowPopup(false);
    setUsername('');
    setLoader(true);
  }, []);
  return (

    <>
    {
      loader? <div className='absolute left-[50%] top-[50%] bottom-[50%] right-[50%]'><Loader/></div>
      :
    <>
      <NavBar username={username} />
      <div
        className="flex items-center mx-auto my-12 text-center text-white bg-[#2C2A2A] w-[300px] rounded-[20px] h-[50px] p-6 border-solid border-4 border-black hover:bg-[#434343] transition-all duration-500 hover:cursor-pointer"
        onClick={() => {
          setShowPopup(!showPopup);
          setError('');
        }}
      >
        <Plus />
        Add new Note
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="p-5 w-96 bg-[#0E0E0E] rounded-xl">
            <div className='h-3 text-center text-red-700'>{error}</div>
            <form className="text-white"  onSubmit={CreateNote}>
              <InputTags
                name="Category"
                label="Category: "
                type="text"
                placeholder="Category"
                function={CheckLetter}
                required={true}
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
                  <label htmlFor="description" className="w-1/3 text-lg">
                    Description:
                  </label>
                  <textarea
                    className="h-26 w-[63%] p-3 text-sm bg-[#171617] border-l-0 border-r-0 border-t-0 border-b"
                    placeholder="Description"
                    name="description"
                    required
                    onChange={CheckLetter}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center mt-8">
                  <label htmlFor="date" className="w-1/3 text-lg">
                    Date:
                  </label>
                  <input
                    type="date"
                    name="CompletionDate"
                    min={minDate}
                    className="h-26 w-[63%] p-3 text-sm bg-[#171617] border-l-0 border-r-0 border-t-0 border-b"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <button
                    type="submit"
                    className="mt-8 bg-[#161616] w-[150px] h-[50px] border-2 rounded-lg border-black hover:bg-[#2d2a2a] transition-all duration-500"
                  >
                    Submit
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="mt-8 bg-[#161616] w-[150px] h-[50px] border-2 rounded-lg border-black hover:bg-[#2d2a2a] transition-all duration-500"
                    onClick={() => {
                      setShowPopup(!showPopup);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
                
      )}
      <h1 className='text-4xl text-center text-black'>Your Notes</h1>
      <div  className='text-white my-7'>
 <Box notes={notes}></Box>
</div>
      </>   
}




    </>
  );
}