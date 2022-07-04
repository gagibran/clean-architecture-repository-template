import { FormEvent } from 'react';
import { deleteByIdAsync } from '../api/requests';
import { PRODUCT_API_BASE_URL } from '../common/constants/productConstants';
import AvailableProductActions from '../common/enums/availableProductActions';
import ProductEntity from '../entities/productEntity';
import useCreateProduct from '../hooks/useCreateProduct';

interface Props {
    fetchProductsAsync: () => Promise<void>
}

const DeleteProductById = ({ fetchProductsAsync }: Props) => {
    const [productState, productDispatcher] = useCreateProduct();

    const getProductToBeDeletedIdHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => {
        productDispatcher({
            type: AvailableProductActions.SetId,
            payload: { productId: inputEvent.currentTarget.value }
        });
    };

    const updateProductSubmitHandlerAsync = async (formEvent: FormEvent) => {
        formEvent.preventDefault();
        if (!productState.productId) {
            return;
        }
        await deleteByIdAsync<ProductEntity>(PRODUCT_API_BASE_URL, productState.productId);
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
