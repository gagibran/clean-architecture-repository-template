import { useState } from 'react';
import { getByIdAsync } from '../api/requests';
import { PRODUCT_API_BASE_URL } from '../common/constants/productConstants';
import ProductEntity from '../entities/productEntity';

const useFindProductById = (): [boolean, ProductEntity | undefined, (entityId: string) => Promise<void>] => {
    const [productById, setProductById] = useState<ProductEntity>();
    const [doesProductExist, setDoesProductExist] = useState(true);
    const fetchProductByIdAsync = async (productId: string) => {
        try {
            const foundProduct = await getByIdAsync<ProductEntity>(PRODUCT_API_BASE_URL, productId);
            setDoesProductExist(true);
            setProductById(foundProduct);
        } catch (error) {
            console.log(error);
            setDoesProductExist(false);
        }
    };
    return [doesProductExist, productById, fetchProductByIdAsync];
};

export default useFindProductById;
