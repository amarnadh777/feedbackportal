import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Feedback from './pages/Feedback'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { slide as Menu } from 'react-burger-menu';
import Login from './pages/Login';
import Register from './pages/Register';
import Myfeedback from './pages/Myfeedback';
import EditFeedback from './pages/EditFeedback';
import ResponedtoFeedback from './pages/adminPages/ResponedtoFeedback';
import Myresponse from './pages/adminPages/Myresponse';
import Protected from './pages/Protected';
import AdminProtected from './pages/AdminProtected';
function App() {


  return (
    <>
 
   <Router>

    <Routes>

      <Route  path='/' element={
              <Protected>   <Home/></Protected>
      
    }/>
      <Route  path='/feedback' element={ <Protected> <Feedback/>  </Protected>  }/>
      <Route  path='/login' element={<Login/>}/>
      <Route  path='/register' element={<Register/>}/>

      <Route path='/myfeedback' element={  <Protected> <Myfeedback/> </Protected>   } />
      <Route path='/myfeedback/edit' element={ <Protected><EditFeedback /></Protected>} />
      <Route path='/admin/response' element={ <AdminProtected> <ResponedtoFeedback/> </AdminProtected>  } />
      <Route path='/admin/myresponse' element={ <AdminProtected> <Myresponse/> </AdminProtected>   } />


    </Routes>
   </Router>

    </>
  )
}

export default App
