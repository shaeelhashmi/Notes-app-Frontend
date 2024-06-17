
import './App.css'
import LoginForm from './Components/LoginForm'
import Registration from './Components/Registration'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  return (
<Router basename="/">
      <Routes>
        <Route  path="/login" element={<LoginForm />}  />
        <Route  path="/signup" element={<Registration />}  />
      </Routes>
    </Router>
  )
}

export default App
