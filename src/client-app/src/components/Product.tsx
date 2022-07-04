import { useCallback, useEffect, useState } from 'react';
import { getAllAsync } from '../api/requests';
import { PRODUCT_API_BASE_URL } from '../common/constants/productConstants';
import ProductEntity from '../entities/productEntity';
import GetAllProducts from './GetAllProducts';
import CreateProduct from './CreateProduct';
import DeleteProductById from './DeleteProductById';
import GetProductById from './GetProductById';
import UpdateProductById from './UpdateProductById';

const Product = () => {
    const [products, setProducts] = useState<ProductEntity[]>([]);

    const fetchProductsAsync = useCallback(async () => {
        const foundProducts = await getAllAsync<ProductEntity>(PRODUCT_API_BASE_URL);
        if (!foundProducts) {
            return;
        }
        setProducts(foundProducts);
    }, []);

    useEffect(() => {
        fetchProductsAsync();
    }, [fetchProductsAsync]);

    return (
        <section>
            <GetAllProducts products={products} />
            <GetProductById />
            <CreateProduct fetchProductsAsync={fetchProductsAsync} />
            <UpdateProductById fetchProductsAsync={fetchProductsAsync} />
            <DeleteProductById fetchProductsAsync={fetchProductsAsync} />
        </section>
    );
};

export default Product;
