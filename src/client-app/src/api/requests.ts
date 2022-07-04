import axios, { AxiosError } from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api/';

export const getAllAsync = async <TEntity>(url: string) => {
    try {
        const response = await axios.get<TEntity[]>(url);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log('Error trying to fetch entities.');
            console.log(error.response?.data.errors);
        }
    }
};

export const getByIdAsync = async <TEntity>(url: string, id: string) => {
    try {
        const response = await axios.get<TEntity>(`${url}/${id}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log('Error trying to fetch entity by ID.');
            console.log(error.response?.data.errors);
        }
    }
};

export const createAsync = async <TEntity>(url: string, body: TEntity) => {
    try {
        await axios.post<TEntity>(url, body);
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log('Error trying to create entity.');
            console.log(error.response?.data.errors);
        }
    }
};

export const updateByIdAsync = async <TEntity>(url: string, body: TEntity, id: string) => {
    try {
        await axios.put<TEntity>(`${url}/${id}`, body);
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log('Error trying to updated entity by ID.');
            console.log(error.response?.data.errors);
        }
    }
};

export const deleteByIdAsync = async <TEntity>(url: string, id: string) => {
    try {
        const response = await axios.delete<TEntity>(`${url}/${id}`);
        return response.status;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log('Error trying to delete entity by ID.');
            console.log(error.response?.data.errors);
        }
    }
};
