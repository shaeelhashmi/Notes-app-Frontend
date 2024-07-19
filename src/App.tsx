import './App.css'
import HomePage from './Components/HomePage'
import LoginForm from './Components/LoginForm'
import Registration from './Components/Registration'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setName } from './Slice/GetUserName/UserName'
import { setMode } from './Slice/SetLightMode/Mode'
import axios from 'axios'
import { useEffect } from 'react'
import {valueTaken} from './Slice/ValuesTaken/Check'
import ShowNotes from './Components/ShowNotes'
import Settings from './Components/Settings'
import Page404 from './Components/Page404'
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
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch(setMode(false))
      document.body.style.backgroundColor = '#00000C'
      } else {
      dispatch(setMode(true))
      document.body.style.backgroundColor = 'rgb(249, 247, 247)'
      }
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
        <Route path='/settings' element={<Settings/>}></Route>
        <Route path="*" element={<Page404/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
