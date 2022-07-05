import { FormEvent, useRef, useState } from 'react';
import { updateByIdAsync } from '../api/requests';
import { PRODUCT_API_BASE_URL } from '../common/constants/productConstants';
import AvailableProductActions from '../common/enums/availableProductActions';
import ProductEntity from '../entities/productEntity';
import useCreateProduct from '../hooks/useCreateProduct';
import useFindProductById from '../hooks/useFindProductById';
import styles from '../styles/Product.module.css';

interface Props {
    fetchProductsAsync: () => Promise<void>
}

const UpdateProductById = ({ fetchProductsAsync }: Props) => {
    const [isProductUpdated, setIsProductUpdated] = useState(true);
    const [productState, productDispatcher] = useCreateProduct();
    const [doesProductToBeUpdatedExist, productToBeUpdated, findProductToBeUpdatedByIdAsync] = useFindProductById();
    const productNameRef = useRef<HTMLInputElement>(null);
    const productPriceRef = useRef<HTMLInputElement>(null);

    const getProductToBeUpdatedByIdHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => {
        productDispatcher({
            type: AvailableProductActions.SetId,
            payload: { productId: inputEvent.currentTarget.value }
        });
        await findProductToBeUpdatedByIdAsync(inputEvent.currentTarget.value);
    };

    const updateProductSubmitHandlerAsync = async (formEvent: FormEvent) => {
        try {
            formEvent.preventDefault();
            if (!productNameRef.current
                || !productPriceRef.current
                || !productState.productId) {
                return;
            }
            const updatedProduct = {
                name: productNameRef.current.value,
                price: +productPriceRef.current.value
            };
            await updateByIdAsync<ProductEntity>(
                PRODUCT_API_BASE_URL,
                updatedProduct,
                productState.productId
            );
            setIsProductUpdated(true);
            await fetchProductsAsync();
        } catch (error) {
            console.log(error);
            setIsProductUpdated(false);
        }
    };

    return (
        <form
            className={styles['product__products-section']}
            onSubmit={updateProductSubmitHandlerAsync}
        >
            <h2>Update Product</h2>
            <label htmlFor="getProductToBetUpdatedById">Product ID</label>
            <input
                type="text"
                id="getProductToBetUpdatedById"
                onChange={getProductToBeUpdatedByIdHandlerAsync}
                required
            />
            {!doesProductToBeUpdatedExist ?
            <p className={styles['product-section__no-products']}>
                Incorrect ID format or product does not exist.
            </p> :
            null}
            <label htmlFor="productNameUpdate">Product Name</label>
            <input
                type="text"
                id="productNameUpdate"
                ref={productNameRef}
                defaultValue={productToBeUpdated?.name}
                required
            />
            <label htmlFor="productPriceUpdate">Price</label>
            <input
                type="number"
                step="0.01"
                id="productPriceUpdate"
                ref={productPriceRef}
                defaultValue={productToBeUpdated?.price}
                required
            />
            {!isProductUpdated
            ? <p className={styles['product-section__no-products']}>
                Product could not be updated.
            </p>
            : null}
            <button type="submit">Update Product</button>
        </form>
    );
};

export default UpdateProductById;
