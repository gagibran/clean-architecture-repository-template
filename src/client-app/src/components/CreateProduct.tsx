import { FormEvent, useState } from 'react';
import { createProductAsync } from '../api/productRequests';
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
        const productToBeCreated: ProductEntity = {
            id: '',
            createdAt: '',
            updatedAt: '',
            name: newProductName,
            price: newProductType
        };
        const createdProduct = await createProductAsync(productToBeCreated);
        if (createdProduct) {
            fetchProductsAsync();
        }
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
