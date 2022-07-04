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
    const [isLoading, setIsLoading] = useState(false);
    const [productState, productDispatcher] = useCreateProduct();

    const getProductElement = () => {
        if (isLoading) {
            return <p className={styles['product-section__loading']}>Loading...</p>
        } if (!isProductDeleted) {
            return (
                <p className={styles['product-section__no-products']}>
                    Incorrect ID format or product does not exist.
                </p>
            );
        }
    };

    const getProductToBeDeletedIdHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => {
        productDispatcher({
            type: AvailableProductActions.SetId,
            payload: { productId: inputEvent.currentTarget.value }
        });
    };

    const deleteProductSubmitHandlerAsync = async (formEvent: FormEvent) => {
        formEvent.preventDefault();
        setIsProductDeleted(false);
        setIsLoading(true);
        if (!productState.productId) {
            return;
        }
        const status = await deleteByIdAsync<ProductEntity>(PRODUCT_API_BASE_URL, productState.productId);
        setIsLoading(false);
        if (!status || status > 400) {
            return;
        }
        await fetchProductsAsync();
        setIsProductDeleted(true);
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
            {getProductElement()}
            <button type="submit">Delete Product</button>
        </form>
    );
};

export default DeleteProductById;
