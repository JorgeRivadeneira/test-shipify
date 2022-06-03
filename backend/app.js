import cors from 'cors'
import express from 'express';

import routerVehicle from './routes/routes.js';

const PORT = process.env.PORT || 7000;

const app = express();

app.use(cors())
app.use(express.json())
app.use('/vehicles',  routerVehicle)

app.listen((PORT), () => {
    console.log(`Listening at port: ${PORT}`);
})