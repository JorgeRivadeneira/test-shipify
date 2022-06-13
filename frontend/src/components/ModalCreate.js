import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const  ModalCreate = () => {
    const URI = 'http://localhost:7000/vehicles/'
    const [driverId, setDriverId] = useState();
    const [plate, setPlate] = useState('');
    const [model, setModel] = useState('');
    const [type, setType] = useState('');
    const [capacity, setCapacity] = useState('');
    const [loading, setLoading] = useState(true);

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
        if(id){
            console.log(id);
            const fetchData = async ()=> {
                await getVehicle();
             }
     
             fetchData();
        }        
    }, []);

    const getVehicle = async () => {
        const res = await axios.get(URI + id);
        if(res.data.length > 0){
            setDriverId(res.data[0].driver_id);
            setPlate(res.data[0].plate);
            setModel(res.data[0].model);
            setType(res.data[0].type);
            setCapacity(res.data[0].capacity);
        }

    }     

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
    
    const handleSave =() => {
        //console.log('handle save');
        if(id){
            console.log('update');
            update();
        }else{
            console.log('store');
            store();
        }
    }

  return (
        <>
            <button type="button" 
            className="btn btn-primary" 
            data-bs-toggle="modal" 
            data-bs-target="#exampleModal">
                Launch demo modal
            </button>    
            <div className="modal fade" tabIndex="-1" id="exampleModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">                        
                        <form onSubmit={handleSave}>
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

                            <button type="submit" className="btn btn-primary">Save</button>
                            
                            <Link to={'/'} className='btn btn-danger m-2 mb-2'>
                                <span>Cancel</span>
                            </Link>

                        </form> 

                    </div>
                    </div>
                </div>
            </div>           
        </>
  )
}