import { Measureunit } from "../model/measureunit";

const measureunits = [
    new Measureunit({
        id: 1,
        name:"kilo",
        size: 1000

    }),
    new Measureunit({
        id: 2,
        name:"gram",
        size: 1

    }),
]


const getAllMeasureunits = (): Measureunit[] => {
    return measureunits;
};

const getMeasureunitById = ({ id }: { id: number }): Measureunit|null => {
    const measureunit = measureunits.find(measureunit => measureunit.getId() === id);
    if (measureunit){
        return measureunit
    }
    else return null
};

export default {
    getAllMeasureunits,
    getMeasureunitById
};