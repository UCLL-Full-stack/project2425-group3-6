import { Measureunit } from "../model/measureunit";
import measureunitDb from "../repository/measureunit.db";

const getAllMeasureunits = (): Measureunit[] => {
    return measureunitDb.getAllMeasureunits() ;
};

const getMeasureunitById = (id:number): Measureunit =>{
    const measureunit = measureunitDb.getMeasureunitById({id})
    if(measureunit)
        return measureunit
    else if(measureunit == null){
        throw new Error(`Measureunit with id ${id} does not exist.`)
    }
    else{throw new Error(`Error encountered in the backend.`)}
};

export default { getAllMeasureunits, getMeasureunitById  };
