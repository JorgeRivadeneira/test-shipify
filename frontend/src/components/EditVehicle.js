import axios from "axios";
import {useEffect, useState} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const URI = 'http://localhost:7000/vehicles/';

export const EditVehicle = () => {
    const [driverId, setDriverId] = useState();
    const [plate, setPlate] = useState('');
    const [model, setModel] = useState('');
    const [type, setType] = useState('');
    const [capacity, setCapacity] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const {id} = useParams();

    const update = async(e) => {
        e.preventDefault()
        setLoading(true);
        await axios.put(URI+id, {
            id: id,
            driver_id: driverId,
            plate: plate,
            model: model,
            type: type,
            capacity: capacity            
        })
        setLoading(false);
        navigate('/')
    }

    useEffect( () => {
        const fetchData = async ()=> {
           await getVehicle();
        }

        fetchData();
        
    }, []);

    const getVehicle = async () => {
        const res = await axios.get(URI + id);
        setDriverId(res.data[0].driver_id);
        setPlate(res.data[0].plate);
        setModel(res.data[0].model);
        setType(res.data[0].type);
        setCapacity(res.data[0].capacity);
    }    

    return (
        <div className='m-5'>
            <h3>Create a new Vehicle</h3>
            <form onSubmit={update}>
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
                
                {loading && 
                    <button type="submit" className="btn btn-primary">Update</button>               
                }

                <Link to={'/'} className='btn btn-danger m-2 mb-2'>
                    <span>Cancel</span>
                </Link>                

            </form>            
        </div>
    )
}
