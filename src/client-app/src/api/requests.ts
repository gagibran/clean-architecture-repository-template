import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api/';

export const getAllAsync = async <TEntity>(url: string) => {
    const response = await axios.get<TEntity[]>(url);
    return response.data;
};

export const getByIdAsync = async <TEntity>(url: string, id: string) => {
    const response = await axios.get<TEntity>(`${url}/${id}`);
    return response.data;
};

export const createAsync = async <TEntity>(url: string, body: TEntity) => {
    const response = await axios.post<TEntity>(url, body);
    return response.status;
};

export const updateByIdAsync = async <TEntity>(url: string, body: TEntity, id: string) => {
    const response = axios.put<TEntity>(`${url}/${id}`, body);
    return (await response).status;
};

export const deleteByIdAsync = async <TEntity>(url: string, id: string) => {
    const response = await axios.delete<TEntity>(`${url}/${id}`);
    return response.status;
};
