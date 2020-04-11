import {request} from "../../base/HTTP";
import HttpMethod from "../../constants/HttpMethod";

export async function getCarCategories(data) {
    return await request('/api/carCategory/search', data);
}

export async function getAllCarCategories() {
    return await request('/api/carCategory/all');
}

export async function addCarCategory(data) {
    return await request('/api/carCategory', data, HttpMethod.POST);
}

export async function editCarCategory(data) {
    return await request('/api/carCategory', data, HttpMethod.PUT);
}

export async function deleteCarCategory(id) {
    return await request('/api/carCategory/' + id, {}, HttpMethod.DELETE);
}
