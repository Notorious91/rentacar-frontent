import {request} from "../../base/HTTP";
import HttpMethod from "../../constants/HttpMethod";

export async function getOrders(data) {
    return await request('/api/order/search', data);
}

export async function getAllOrders() {
    return await request('/api/order/all');
}

export async function addOrder(data) {
    return await request('/api/order', data, HttpMethod.POST);
}

export async function editOrder(data) {
    return await request('/api/order', data, HttpMethod.PUT);
}

export async function deleteOrder(id) {
    return await request('/api/order/' + id,{}, HttpMethod.DELETE);
}
