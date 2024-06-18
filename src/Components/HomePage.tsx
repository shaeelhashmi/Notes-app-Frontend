import { useEffect, useState } from 'react';
import InputTags from './InputTags';
import NavBar from './NavBar';
import Plus from './SVG/Plus';
import Loader from './Loader.tsx'
export default function HomePage() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Add 1 day
  const minDate = tomorrow.toISOString().split('T')[0]; // Get tomorrow's date in YYYY-MM-DD format

  const [showPopup, setShowPopup] = useState(false);
  const [username, setUsername] = useState(''); // State to store username
  const [loader, setLoader] = useState(true); // State to store loader

  const checkLogin = async () => {
    try {
      const res = await fetch('/checklogin');
      const data = await res.json();
      if (data === undefined) {
        window.location.href = '/login';
      } else {
        setUsername(data);
        setLoader(false);
      }
    } catch (error) {
      setLoader(true);
       window.location.href = '/login';
    } 
  };

  useEffect(() => {
    checkLogin();
  }, []);
  return (

    <>
    {
      loader? <div className='absolute left-[50%] top-[50%] bottom-[50%] right-[50%]'><Loader></Loader></div>:
    <>
      <NavBar username={username} />
      <div
        className="flex items-center mx-auto my-12 text-center text-white bg-[#2C2A2A] w-[300px] rounded-[20px] h-[50px] p-6 border-solid border-4 border-black hover:bg-[#434343] transition-all duration-500 hover:cursor-pointer"
        onClick={() => {
          setShowPopup(!showPopup);
        }}
      >
        <Plus />
        Add new Note
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="p-5 w-96 bg-[#0E0E0E] rounded-xl">
            <form className="text-white">
              <InputTags
                name="Category"
                label="Category: "
                type="text"
                placeholder="Category"
              />
              <InputTags
                name="Title"
                label="Title: "
                type="text"
                placeholder="Title"
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
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center mt-8">
                  <label htmlFor="description" className="w-1/3 text-lg">
                    Date:
                  </label>
                  <input
                    type="date"
                    name="CompletionDate"
                    min={minDate}
                    className="h-26 w-[63%] p-3 text-sm bg-[#171617] border-l-0 border-r-0 border-t-0 border-b"
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
      </>
}
    </>
  );
}