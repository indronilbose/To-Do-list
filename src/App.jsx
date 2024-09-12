import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Signup from './component/Signup'
import Login from './component/Login'
import Home from './component/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/clear' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
      </Routes>
    </Router>
  )
}

export default App