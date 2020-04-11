import {request} from "../../base/HTTP";
import HttpMethod from "../../constants/HttpMethod";

export async function getParts(data) {
    return await request('/api/part/search', data);
}

export async function getAllParts() {
    return await request('/api/part/all');
}

export async function addPart(data) {
    return await request('/api/part', transformData(data), HttpMethod.POST);
}

export async function editPart(data) {
    return await request('/api/part', transformData(data), HttpMethod.PUT);
}

export async function deletePart(id) {
    return await request('/api/part/' + id,{}, HttpMethod.DELETE);
}

function transformData(data) {

    return {
        id: data.id,
        name: data.name,
        price: parseFloat(data.price)
    };
}
