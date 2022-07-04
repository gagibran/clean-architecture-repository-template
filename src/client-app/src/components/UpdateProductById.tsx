import { FormEvent, useRef } from 'react';
import { updateByIdAsync } from '../api/requests';
import { PRODUCT_API_BASE_URL } from '../common/constants/productConstants';
import AvailableProductActions from '../common/enums/availableProductActions';
import ProductEntity from '../entities/productEntity';
import useCreateProduct from '../hooks/useCreateProduct';
import useFindProductById from '../hooks/useFindProductById';

interface Props {
    fetchProductsAsync: () => Promise<void>
}

const UpdateProductById = ({ fetchProductsAsync }: Props) => {
    const [productState, productDispatcher] = useCreateProduct();
    const [productToBeUpdated, setProductToBeUpdatedByIdAsync] = useFindProductById();
    const productNameRef = useRef<HTMLInputElement>(null);
    const productPriceRef = useRef<HTMLInputElement>(null);

    const getProductToBeUpdatedByIdHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => {
        productDispatcher({
            type: AvailableProductActions.SetId,
            payload: { productId: inputEvent.currentTarget.value }
        });
        await setProductToBeUpdatedByIdAsync(inputEvent.currentTarget.value);
    };

    const updateProductSubmitHandlerAsync = async (formEvent: FormEvent) => {
        formEvent.preventDefault();
        if (!productNameRef.current || !productPriceRef.current || !productState.productId) {
            return;
        }
        const updatedProduct = {
            name: productNameRef.current.value,
            price: +productPriceRef.current.value
        };
        await updateByIdAsync<ProductEntity>(PRODUCT_API_BASE_URL, updatedProduct, productState.productId);
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
                ref={productNameRef}
                defaultValue={productToBeUpdated?.name}
            />
            <label htmlFor="productPriceUpdate">Price</label>
            <input
                type="number"
                step="0.01"
                id="productPriceUpdate"
                ref={productPriceRef}
                defaultValue={productToBeUpdated?.price}
            />
            <button type="submit">Update Product</button>
        </form>
    );
};

export default UpdateProductById;
