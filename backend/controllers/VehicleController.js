import mySQLConnection from "../databases/connection.js";
//CRUD operations

//Show all records
export const getAllVehicles = async (req, res)=> {
    const id = req.params.id;
    let where = '';
    let sql = '';
    if (id > 0){
        where = ' AND v.id =  ' + id;
    }
        sql = " SELECT v.id, v.driver_id, d.first_name + ' ' + d.last_name AS driver_name,  " + 
        " c.id company_id, c.name company_name,  " + 
        " v.plate, v.model, v.type, v.capacity, v.creation_date " + 
        " FROM company c, driver d, vehicle v " + 
        " WHERE c.id = d.company_id " + where +
        " AND d.id = v.driver_id  ORDER by v.driver_id";

    console.log(sql);

    const vehicles = await mySQLConnection.query( sql,  (error, results) => {
        if(error){
            res.json({message: 'Error: ' + error})
        }else{
            res.json(results);
        }
    });
}

// //Show only one record
// export const getVehicle = async (req, res)=> {



   

//     const vehicles = await mySQLConnection.query( sql, [id], (error, results) => {
//         console.log(results);
//         if(error){
//             res.json({message: 'Error: ' + error})
//         }else{
//             res.json(results);
//         }
//     });
// }

export const getVehicleByDriverId = async (req, res)=> {

    const driver_id = req.params.id;

    const sql = " SELECT v.id, v.driver_id, d.first_name + ' ' + d.last_name AS driver_name,  " + 
    " c.id company_id, c.name company_name,  " + 
    " v.plate, v.model, v.type, v.capacity, v.creation_date " + 
    " FROM company c, driver d, vehicle v " + 
    " WHERE c.id = d.company_id " + 
    " AND v.driver_id = ? " +
    " AND d.id = v.driver_id ORDER by v.driver_id ";

    const vehicles = await mySQLConnection.query( sql, [driver_id], (error, results) => {        
        console.log(results);
        if(error){
            res.json({message: 'Error: ' + error})
        }else{
            res.json(results);
        }
    });
}

// //Create a new record
export const createVehicle = async (req, res)=> {

    const sql = " INSERT INTO vehicle SET ?  ";

    const {id, driver_id, plate, model, type, capacity} = req.body;

    const vehicles = await mySQLConnection.query( sql, {
        driver_id: driver_id,
        plate: plate,
        model: model,
        type: type,
        capacity: capacity}, (error, results) => {
        if(error){
            res.json({message: 'Error: ' + error})
        }else{
            res.json(results);
        }
    });
}

// //Update a record
export const updateVehicle = async (req, res)=> {
    const sql = " UPDATE vehicle SET ? WHERE id = ? ";

    const {id, driver_id, plate, model, type, capacity} = req.body;

    const vehicles = await mySQLConnection.query( sql, [{
        driver_id: driver_id,
        plate: plate,
        model: model,
        type: type,
        capacity: capacity}, id], (error, results) => {
        if(error){
            res.json({message: 'Error: ' + error})
        }else{
            res.json(results);
        }
    });
}

// //Delete a vehicle
export const deleteVehicle = async (req, res)=> {
    const sql = " DELETE from vehicle WHERE id = ? ";

    const id = req.params.id;

    const vehicles = await mySQLConnection.query( sql, [id], (error, results) => {
        if(error){
            res.json({message: 'Error: ' + error})
        }else{
            res.json(results);
        }
    });
}