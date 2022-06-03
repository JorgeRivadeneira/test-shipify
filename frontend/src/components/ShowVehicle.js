import axios from 'axios'
import {useState,  useEffect} from 'react'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from './Loading';

const URI = 'http://localhost:7000/vehicles/';

export const ShowVehicle = () => {

    const [vehicle, setVehicle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [driverId, setDriverId] = useState();

    useEffect( () => {
        getVehicles();
    }, []);

    const getVehicles = async () => {
        try {
            setLoading(true);
            const res = await axios.get(URI);
            setVehicle(res.data);
            setLoading(false);            
        } catch (error) {
            toast.error(error);
        }

    }

    const getVehiclesByDriverId = async (driverId) => {
        try {
            setLoading(true);
            const res = await axios.get(`${URI}driver/${driverId}`);
            setVehicle(res.data);
            setLoading(false);            
        } catch (error) {
            toast.error(error);
        }

    }    


    //function to remove a vehicle
    const deleteVehicle = async (id) => {
        await axios.delete(`${URI}${id}`)
        getVehicles()
    }

    const handleSearch = ()=>{
        if(driverId !== ''){
            getVehiclesByDriverId(driverId);
        }else{
            setDriverId(null);
            getVehicles();
        }
        
    }

  return (        
    <div className='container'>
    {loading ? <Loading /> :          
        <div className='row'>
            <div className='col'>
                <div className='row'>
                    <div className='col-2'>
                        <button 
                        type='submit'
                        onClick={()=>{getVehicles();}}
                        className='btn btn-info'> Home</button>
                    </div>   

                    <div className='col-3'>
                        <Link to={'/create'} className='btn btn-primary'>
                            <span>+ Add new vehicle</span>
                        </Link>
                    </div>                 

                    <div className='col-3'>
                            <input 
                                className='form-control'
                                size='9'
                                maxLength='9'
                                width='25px'
                                type='text'
                                id='driverId'
                                name='driverId'
                                placeholder='Enter a driver id'
                                onChange={(e)=>{
                                    setDriverId(e.target.value);
                                }}
                            />
                    </div>   

                    <div className='col-3'>
                            <button type='submit' 
                                onClick={handleSearch}
                                className='btn btn-warning'
                            >Search</button>
                    </div>                                       
                </div>
                <hr/>
                <table className='table'>
                    <thead className='table-primary'>
                        <tr>
                            <th>Driver Id</th>
                            <th>Driver Name</th>
                            <th>Company Id</th>
                            <th>Company Name</th>   
                            <th>Plate</th>
                            <th>Model</th>
                            <th>Type</th>
                            <th>Capacity</th>
                            <th>Creation Date</th>                                                                                                                     
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        {vehicle.map((vehicle) => (                               
                            <tr key={vehicle.id}>
                                <td>{vehicle.driver_id}</td>
                                <td>{vehicle.driver_name}</td>
                                <td>{vehicle.company_id}</td>
                                <td>{vehicle.company_name}</td>
                                <td>{vehicle.plate}</td>
                                <td>{vehicle.model}</td>
                                <td>{vehicle.type}</td>
                                <td>{vehicle.capacity}</td>
                                <td>{vehicle.creation_date}</td>                                                                                                                
                                <td>
                                    <Link to={`/edit/${vehicle.id}`} 
                                    className='btn btn-info'>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                    <button onClick={() => {
                                        setLoading(true);
                                        deleteVehicle(vehicle.id);
                                        setLoading(false);
                                        toast.success('Deleted Successfully', {theme: 'colored', delay: 50});

                                    }} 
                                    className='btn btn-danger'>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                                                       
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    }
<ToastContainer /> 
</div>
  )
}
