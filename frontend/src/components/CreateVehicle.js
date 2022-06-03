import React from 'react';
import {useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'

const URI = 'http://localhost:7000/vehicles/'
export const CreateVehicle = () => {
    const [driverId, setDriverId] = useState();
    const [plate, setPlate] = useState('');
    const [model, setModel] = useState('');
    const [type, setType] = useState('');
    const [capacity, setCapacity] = useState('');
    
    const navigate = useNavigate();

    const store = async (e) => {
        e.preventDefault()
        await axios.post(URI, {
            driver_id: driverId,
            plate: plate,
            model: model,
            type: type,
            capacity: capacity
        });        
        navigate('/')
    }    

    return (
        <div className='m-5'>
            <h3>Create a new Vehicle</h3>
            <form onSubmit={store}>
                <div className="mb-3">
                    <label className="form-label">Driver Id</label>
                    <input type='text'
                    value={driverId}
                    onChange={(e) => setDriverId(e.target.value)}
                    className='form-control' />
                </div>
                <div className="mb-3">
                    <label className="form-label">Plate</label>
                    <input type='text'
                    value={plate}
                    onChange={(e) => setPlate(e.target.value)}
                    className='form-control' />                    
                </div>

                <div className="mb-3">
                    <label className="form-label">Model</label>
                    <input type='text'
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className='form-control' />                    
                </div>

                <div className="mb-3">
                    <label className="form-label">Type</label>
                    <input type='text'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className='form-control' />                    
                </div>   

                <div className="mb-3">
                    <label className="form-label">Capacity</label>
                    <input type='text'
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className='form-control' />                    
                </div>                              

                <button type="submit" className="btn btn-primary">Create</button>
                
                <Link to={'/'} className='btn btn-danger m-2 mb-2'>
                <span>Cancel</span>
                </Link>

            </form>            
        </div>
    )
}
