import { FormEvent, useState } from 'react';
import { getByIdAsync, updateByIdAsync } from '../api/requests';
import { PRODUCT_API_BASE_URL } from '../common/constants/productConstants';
import ProductEntity from '../entities/productEntity';

interface Props {
    fetchProductsAsync: () => Promise<void>
}

const UpdateProductById = ({ fetchProductsAsync }: Props) => {
    const [productToBeUpdatedId, setProductToBeUpdatedId] = useState('');
    const [productToBeUpdated, setProductToBeUpdated] = useState<ProductEntity>();
    const [productNameUpdated, setProductNameUpdated] = useState('');
    const [productPriceUpdated, setProductPriceUpdated] = useState(0);

    const getProductToBeUpdatedByIdHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => {
        setProductToBeUpdatedId(inputEvent.currentTarget.value);
        const foundProduct = await getByIdAsync<ProductEntity>(PRODUCT_API_BASE_URL, inputEvent.currentTarget.value);
        if (foundProduct) {
            setProductToBeUpdated(foundProduct);
        }
    };

    const updateProductNameHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) =>
        setProductNameUpdated(inputEvent.currentTarget.value);

    const updateProductPriceHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) =>
        setProductPriceUpdated(+inputEvent.currentTarget.value);

    const updateProductSubmitHandlerAsync = async (formEvent: FormEvent) => {
        formEvent.preventDefault();
        if (!productToBeUpdated) {
            return;
        }
        const newProduct: ProductEntity = {
            name: productNameUpdated,
            price: productPriceUpdated
        };
        await updateByIdAsync<ProductEntity>(PRODUCT_API_BASE_URL, newProduct, productToBeUpdatedId);
        await fetchProductsAsync();
    };

    return (
        <form onSubmit={updateProductSubmitHandlerAsync}>
            <h2>Update Product</h2>
            <label htmlFor="getProductToBetUpdatedById"></label>
            <input
                type="text"
                id="getProductToBetUpdatedById"
                onChange={getProductToBeUpdatedByIdHandlerAsync}
            />
            <label htmlFor="productNameUpdate">Product Name</label>
            <input
                type="text"
                id="productNameUpdate"
                onChange={updateProductNameHandlerAsync}
                defaultValue={productToBeUpdated?.name}
            />
            <label htmlFor="productPriceUpdate">Price</label>
            <input
                type="number"
                id="productPriceUpdate"
                onChange={updateProductPriceHandlerAsync}
                defaultValue={productToBeUpdated?.price}
            />
            <button type="submit">Update Product</button>
        </form>
    );
};

export default UpdateProductById;
