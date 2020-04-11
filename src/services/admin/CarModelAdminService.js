import {request} from "../../base/HTTP";
import HttpMethod from "../../constants/HttpMethod";

export async function getCarModels(data) {
    return await request('/api/carModel/search', data);
}

export async function getAllCarModels() {
    return await request('/api/carModel/all');
}

export async function addCarModel(data) {
    return await request('/api/carModel', data, HttpMethod.POST);
}

export async function editCarModel(data) {
    return await request('/api/carModel', data, HttpMethod.PUT);
}

export async function deleteCarModel(id) {
    return await request('/api/carModel/' + id,{}, HttpMethod.DELETE);
}
