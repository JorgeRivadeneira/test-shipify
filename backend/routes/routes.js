import express from 'express'
import { getAllVehicles, createVehicle, updateVehicle, deleteVehicle, getVehicleByDriverId } from '../controllers/VehicleController.js';

const router = express.Router();

router.get('/', getAllVehicles);

router.get('/:id', getAllVehicles);

router.get('/driver/:id', getVehicleByDriverId);

router.post('/',  createVehicle);

router.put('/:id', updateVehicle);

router.delete('/:id', deleteVehicle);

export default router;