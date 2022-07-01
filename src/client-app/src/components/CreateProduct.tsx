import { FormEvent, useState } from 'react';
import { createAsync } from '../api/requests';
import { PRODUCT_API_BASE_URL } from '../common/constants/productConstants';
import ProductEntity from '../entities/productEntity';

interface Props {
    fetchProductsAsync: () => Promise<void>
}

const CreateProduct = ({ fetchProductsAsync }: Props) => {
    const [newProductName, setNewProductName] = useState('');
    const [newProductType, setNewProductType] = useState(0);

    const createProductNameHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) =>
        setNewProductName(inputEvent.currentTarget.value);

    const createProductPriceHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) =>
        setNewProductType(+inputEvent.currentTarget.value);

    const createProductSubmitHandlerAsync = async (formEvent: FormEvent) => {
        formEvent.preventDefault();
        const productToBeCreated = {
            name: newProductName,
            price: newProductType
        };
        await createAsync<ProductEntity>(PRODUCT_API_BASE_URL, productToBeCreated);
        await fetchProductsAsync();
    };

    return (
        <form onSubmit={createProductSubmitHandlerAsync}>
            <h2>Create Product</h2>
            <label htmlFor="productNameCreate">Product Name</label>
            <input
                type="text"
                id="productNameCreate"
                onChange={createProductNameHandlerAsync}
                required
                />
            <label htmlFor="productPriceCreate">Price</label>
            <input
                type="number"
                id="productPriceCreate"
                onChange={createProductPriceHandlerAsync}
                required
            />
            <button type="submit">Create Product</button>
        </form>
    );
};

export default CreateProduct;
