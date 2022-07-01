import { useCallback, useEffect, useState } from 'react';
import { getAllProductsAsync } from '../api/productRequests';
import ProductEntity from '../entities/productEntity';
import AllProducts from './AllProducts';
import CreateProduct from './CreateProduct';
import GetProductById from './GetProductById';
import UpdateProductById from './UpdateProductById';

const Product = () => {
    const [products, setProducts] = useState<ProductEntity[]>([]);

    const fetchProductsAsync = useCallback(async () => {
        const foundProducts = await getAllProductsAsync();
        setProducts(foundProducts ?? []);
    }, []);

    useEffect(() => {
        fetchProductsAsync();
    }, [fetchProductsAsync]);

    return (
        <section>
            <AllProducts products={products} />
            <GetProductById />
            <CreateProduct fetchProductsAsync={fetchProductsAsync} />
            <UpdateProductById fetchProductsAsync={fetchProductsAsync} />
        </section>
    );
};

export default Product;
