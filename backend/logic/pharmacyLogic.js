import Pharmacy from '../model/pharmacyModel.js';

export const getPharmacies = async () => {
    return await Pharmacy.find({}, 'nombre');
}