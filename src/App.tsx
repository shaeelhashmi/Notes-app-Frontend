import './App.css'
import HomePage from './Components/HomePage'
import LoginForm from './Components/LoginForm'
import Registration from './Components/Registration'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setName } from './Slice/GetUserName/UserName'
import axios from 'axios'
import { useEffect } from 'react'
import {valueTaken} from './Slice/ValuesTaken/Check'
import ShowNotes from './Components/ShowNotes'
function App() {
  const dispatch = useDispatch()
  const setData=async()=>{
    try{
    const res=await axios.get('/checklogin')
    if(res.status===200){
      dispatch(setName(res.data.username))
      dispatch(valueTaken())
    }else{
      dispatch(valueTaken())
    }
  }catch{
    dispatch(valueTaken())
  }
  }
  useEffect(() => {
    (async()=>{
      await setData()
    })();
  },[])
  return (
    <>
<Router >
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}/>
        <Route  path="/login" element={<LoginForm />}  />
        <Route  path="/signup" element={<Registration />}  />
        <Route path="/notes/:id" element={<ShowNotes/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
