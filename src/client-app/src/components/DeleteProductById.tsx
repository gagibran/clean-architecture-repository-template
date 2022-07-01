import { FormEvent, useState } from 'react';
import { deleteByIdAsync } from '../api/requests';
import { PRODUCT_API_BASE_URL } from '../common/constants/productConstants';
import ProductEntity from '../entities/productEntity';

interface Props {
    fetchProductsAsync: () => Promise<void>
}

const DeleteProductById = ({ fetchProductsAsync }: Props) => {
    const [productToBeDeletedId, setProductToBeDeletedId] = useState('');

    const getProductToBeDeletedIdHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => {
        setProductToBeDeletedId(inputEvent.currentTarget.value);
    };

    const updateProductSubmitHandlerAsync = async (formEvent: FormEvent) => {
        formEvent.preventDefault();
        await deleteByIdAsync<ProductEntity>(PRODUCT_API_BASE_URL, productToBeDeletedId);
        await fetchProductsAsync();
    };

    return (
        <form onSubmit={updateProductSubmitHandlerAsync}>
            <h2>Delete Product</h2>
            <label htmlFor="getProductToBetDeletedId"></label>
            <input
                type="text"
                id="getProductToBetDeletedId"
                onChange={getProductToBeDeletedIdHandlerAsync}
            />
            <button type="submit">Delete Product</button>
        </form>
    );
};

export default DeleteProductById;
