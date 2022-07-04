import { useState } from 'react';
import { getByIdAsync } from '../api/requests';
import { PRODUCT_API_BASE_URL } from '../common/constants/productConstants';
import ProductEntity from '../entities/productEntity';

const useFindProductById = (): [ProductEntity | undefined, (entityId: string) => Promise<void>] => {
    const [productById, setProductById] = useState<ProductEntity>();

    const setProductByIdAsync = async (productId: string) => {
        const foundProduct = await getByIdAsync<ProductEntity>(PRODUCT_API_BASE_URL, productId);
        setProductById(foundProduct);
    };

    return [productById, setProductByIdAsync];
};

export default useFindProductById;
