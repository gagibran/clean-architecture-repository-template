import { useCallback, useEffect, useState } from 'react';
import { getAllProductsAsync } from '../api/productRequests';
import ProductEntity from '../entities/productEntity';
import AllProducts from './AllProducts';
import CreateProduct from './CreateProduct';
import GetProductById from './GetProductById';

const Product = () => {
    const [products, setProducts] = useState<ProductEntity[]>([]);
    const [productById, setProductById] = useState<ProductEntity>();

    const fetchProductsAsync = useCallback(async () => {
        const products = await getAllProductsAsync();
        setProducts(products ?? []);
    }, []);

    useEffect(() => {
        fetchProductsAsync();
    }, [fetchProductsAsync]);

    return (
        <section>
            <AllProducts products={products} />
            <GetProductById productById={productById} setProductById={setProductById} />
            <CreateProduct setProducts={setProducts} />
        </section>
    );
};

export default Product;
