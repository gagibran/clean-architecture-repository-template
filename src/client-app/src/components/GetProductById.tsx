import { FormEvent, useRef } from 'react';
import useFindProductById from '../hooks/useFindProductById';
import Product from './Product';
import styles from '../styles/Product.module.css';

const GetProductById = () => {
    const [doesProductExist, product, findProductByIdAsync] = useFindProductById();
    const getProductIdByRef = useRef<HTMLInputElement>(null);

    const getProductElement = () => {
        if (!doesProductExist) {
            return (
                <p className={styles['product-section__no-products']}>
                    Incorrect ID format or product does not exist.
                </p>
            );
        } else if (product) {
            return <Product product={product} />;
        }
    };

    const getProductSubmitHandlerAsync = async(formEvent: FormEvent) => {
        formEvent.preventDefault();
        if (!getProductIdByRef.current) {
            return;
        }
        await findProductByIdAsync(getProductIdByRef.current?.value)
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
