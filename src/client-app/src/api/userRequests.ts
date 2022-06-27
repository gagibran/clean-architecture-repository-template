import axios, { AxiosError, AxiosResponse } from 'axios';
import User from '../entities/userGet';

axios.defaults.baseURL = 'http://localhost:5000/api/user/';

export const getAllUsersAsync = async () => {
    try {
        const response = await axios.get<User[]>('/');
        return response.data;
    } catch (error) {
        console.log(`There was an error trying to fetch the users: ${error}.`);
    }
};

export const getUserByIdAsync = async (id: string) => {
    try {
        const response = await axios.get<User>(`/${id}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(`There was an error trying to fetch the user with the ID ${id}:`);
            console.log(error.response);
        }
    }
};

export const createUserAsync = async (body: object) => {
    try {
        const response = await axios.post<User>('/', body);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(`There was an error trying to create the user ${JSON.stringify(body)}:`);
            console.log(error.response);
        }
    }
};

export const updateUserByIdAsync = async (body: object, id: string) => {
    try {
        const response =  await axios.put<User>(`/${id}`, body);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(`There was an error trying to update the user ${body} with the ID ${id}:`);
            console.log(error.response);
        }
    }
};

export const deleteUserByIdAsync = async (id: string) => {
    try {
        const response = await axios.delete<User>(`/${id}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(`There was an error trying to delete the user with the ID ${id}:`);
            console.log(error.response);
        }
    }
};
