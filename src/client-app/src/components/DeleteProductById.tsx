import { FormEvent, useState } from 'react';
import { deleteByIdAsync } from '../api/requests';
import { PRODUCT_API_BASE_URL } from '../common/constants/productConstants';
import AvailableProductActions from '../common/enums/availableProductActions';
import ProductEntity from '../entities/productEntity';
import useCreateProduct from '../hooks/useCreateProduct';
import styles from '../styles/Product.module.css';

interface Props {
    fetchProductsAsync: () => Promise<void>
}

const DeleteProductById = ({ fetchProductsAsync }: Props) => {
    const [isProductDeleted, setIsProductDeleted] = useState(true);
    const [productState, productDispatcher] = useCreateProduct();

    const getProductToBeDeletedIdHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => {
        productDispatcher({
            type: AvailableProductActions.SetId,
            payload: { productId: inputEvent.currentTarget.value }
        });
    };

    const deleteProductSubmitHandlerAsync = async (formEvent: FormEvent) => {
        try {
            formEvent.preventDefault();
            if (!productState.productId) {
                return;
            }
            await deleteByIdAsync<ProductEntity>(PRODUCT_API_BASE_URL, productState.productId);
            setIsProductDeleted(true);
            await fetchProductsAsync();
        } catch (error) {
            console.log(error);
            setIsProductDeleted(false);
        }
    };

    return (
        <form
            className={styles['product__products-section']}
            onSubmit={deleteProductSubmitHandlerAsync}
        >
            <h2>Delete Product</h2>
            <label htmlFor="getProductToBetDeletedId">Product ID</label>
            <input
                type="text"
                id="getProductToBetDeletedId"
                onChange={getProductToBeDeletedIdHandlerAsync}
                required
            />
            {!isProductDeleted ?
            <p className={styles['product-section__no-products']}>
                Incorrect ID format or product does not exist.
            </p> :
            null}
            <button type="submit">Delete Product</button>
        </form>
    );
};

export default DeleteProductById;
