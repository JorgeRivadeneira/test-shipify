import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CreateVehicle } from '../components/CreateVehicle'
import { EditVehicle } from '../components/EditVehicle'
import { ShowVehicle } from '../components/ShowVehicle'
import {ModalCreate} from '../components/ModalCreate';

const AppRouter = () => {
  return (
    <div>
      <header>
        <center> 
            <h1>Vehicle Maintenance</h1>
            <p>Candidate: Jorge Rivadeneira</p>
            <br/>
        </center>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ShowVehicle/>} />            
          <Route path='/create' element={<ModalCreate />} />  
          <Route path='/modal' element={<ModalCreate />} />  
          <Route path='/edit/:id' element={<ModalCreate />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default AppRouter