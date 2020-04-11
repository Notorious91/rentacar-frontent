import {request} from "../../base/HTTP";
import HttpMethod from "../../constants/HttpMethod";

export async function getCars(data) {
    return await request('/api/car/search', data);
}

export async function addCars(data) {
    return await request('/api/car', transformData(data), HttpMethod.POST);
}

export async function editCars(data) {
    return await request('/api/car', transformData(data), HttpMethod.PUT);
}

export async function deleteCars(id) {
    return await request('/api/car/' + id,{}, HttpMethod.DELETE);
}

function transformData(data) {
    return {
        ...data,
        price: parseFloat(data.price)
    }
}