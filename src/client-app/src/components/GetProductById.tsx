import { FormEvent, useRef, useState } from 'react';
import useFindProductById from '../hooks/useFindProductById';
import Product from './Product';
import styles from '../styles/Product.module.css';

const GetProductById = () => {
    const [isFirstSubmit, setIsFirstSubmit] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [product, fetchProductByIdAsync] = useFindProductById();
    const getProductIdByRef = useRef<HTMLInputElement>(null);

    const getProductElement = () => {
        if (isLoading) {
            return <p className={styles['product-section__loading']}>Loading...</p>
        } else if (product?.id) {
            return <Product product={product} />;
        } else if (!product && !isFirstSubmit) {
            return (
                <p className={styles['product-section__no-products']}>
                    Incorrect ID format or product does not exist.
                </p>
            );
        }
    };

    const getProductSubmitHandlerAsync = async(formEvent: FormEvent) => {
        formEvent.preventDefault();
        setIsFirstSubmit(false);
        setIsLoading(true);
        if (!getProductIdByRef.current) {
            return;
        }
        await fetchProductByIdAsync(getProductIdByRef.current?.value)
        setIsLoading(false);
    };

    return (
        <form
            className={styles['product__products-section']}
            onSubmit={getProductSubmitHandlerAsync}
        >
            <h2>Get Product By ID</h2>
            <label htmlFor="getProductById">Product ID</label>
            <input type="text" id="getProductById" ref={getProductIdByRef} required />
            {getProductElement()}
            <button type="submit">Get Product</button>
        </form>
    );
};

export default GetProductById;
