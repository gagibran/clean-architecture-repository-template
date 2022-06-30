import axios, { AxiosError } from 'axios';
import ProductEntity from '../entities/productEntity';

axios.defaults.baseURL = 'http://localhost:5000/api/product/';

export const getAllProductsAsync = async () => {
    try {
        const response = await axios.get<ProductEntity[]>('/');
        return response.data;
    } catch (error) {
        console.log(`There was an error trying to fetch the products: ${error}.`);
    }
};

export const getProductByIdAsync = async (id: string) => {
    try {
        const response = await axios.get<ProductEntity>(`/${id}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(`There was an error trying to fetch the product with the ID ${id}:`);
            console.log(error.response);
        }
    }
};

export const createProductAsync = async (body: object) => {
    try {
        const response = await axios.post<ProductEntity>('/', body);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(`There was an error trying to create the product ${JSON.stringify(body)}:`);
            console.log(error.response);
        }
    }
};

export const updateProductByIdAsync = async (body: object, id: string) => {
    try {
        const response =  await axios.put<ProductEntity>(`/${id}`, body);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(`There was an error trying to update the product ${body} with the ID ${id}:`);
            console.log(error.response);
        }
    }
};

export const deleteProductByIdAsync = async (id: string) => {
    try {
        const response = await axios.delete<ProductEntity>(`/${id}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(`There was an error trying to delete the product with the ID ${id}:`);
            console.log(error.response);
        }
    }
};
