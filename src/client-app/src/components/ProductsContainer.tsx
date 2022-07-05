import { useCallback, useEffect, useState } from 'react';
import { getAllAsync } from '../api/requests';
import { PRODUCT_API_BASE_URL } from '../common/constants/productConstants';
import ProductEntity from '../entities/productEntity';
import GetAllProducts from './GetAllProducts';
import CreateProduct from './CreateProduct';
import DeleteProductById from './DeleteProductById';
import GetProductById from './GetProductById';
import UpdateProductById from './UpdateProductById';
import styles from '../styles/Product.module.css';

const ProductsContainer = () => {
    const [products, setProducts] = useState<ProductEntity[]>([]);

    const fetchProductsAsync = useCallback(async () => {
        try {
            const foundProducts = await getAllAsync<ProductEntity>(PRODUCT_API_BASE_URL);
            setProducts(foundProducts);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchProductsAsync();
    }, [fetchProductsAsync]);

    return (
        <section className={styles['product']}>
            <GetAllProducts products={products} />
            <GetProductById />
            <CreateProduct fetchProductsAsync={fetchProductsAsync} />
            <UpdateProductById fetchProductsAsync={fetchProductsAsync} />
            <DeleteProductById fetchProductsAsync={fetchProductsAsync} />
        </section>
    );
};

export default ProductsContainer;
