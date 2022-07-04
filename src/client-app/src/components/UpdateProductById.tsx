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
    const [isProductIdInputNotTouched, setIsProductIdInputNotTouched] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [productState, productDispatcher] = useCreateProduct();
    const [productToBeUpdated, fetchProductToBeUpdatedByIdAsync] = useFindProductById();
    const productNameRef = useRef<HTMLInputElement>(null);
    const productPriceRef = useRef<HTMLInputElement>(null);

    const getProductElement = () => {
        if (isLoading) {
            return <p className={styles['product-section__loading']}>Loading...</p>
        } else if (!productToBeUpdated && !isProductIdInputNotTouched) {
            return (
                <p className={styles['product-section__no-products']}>
                    Incorrect ID format or product does not exist.
                </p>
            );
        }
    };

    const getProductToBeUpdatedByIdHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => {
        setIsProductIdInputNotTouched(false);
        setIsLoading(true);
        productDispatcher({
            type: AvailableProductActions.SetId,
            payload: { productId: inputEvent.currentTarget.value }
        });
        await fetchProductToBeUpdatedByIdAsync(inputEvent.currentTarget.value);
        setIsLoading(false);
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
            {getProductElement()}
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
            <button type="submit">Update Product</button>
        </form>
    );
};

export default UpdateProductById;
