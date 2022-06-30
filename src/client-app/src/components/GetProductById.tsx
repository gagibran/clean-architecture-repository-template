import { FormEvent } from 'react';
import { getProductByIdAsync } from '../api/productRequests';
import ProductEntity from '../entities/productEntity';

interface Props {
    productById: ProductEntity | undefined,
    setProductById: Function
}

const GetProductById = ({ productById, setProductById }: Props) => {
    const getProductByIdHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => {
        const foundProduct = await getProductByIdAsync(inputEvent.currentTarget.value);
        setProductById(foundProduct);
    };

    return (
        <div>
            <h2>Get Product By ID</h2>
            <label htmlFor="getProductById">Product ID</label>
            <input type="text" id="getProductById" onChange={getProductByIdHandlerAsync} />
            <ul>
                <li>{productById?.id && `ID: ${productById?.id}`}</li>
                <li>{productById?.name && `Product Name: ${productById?.name}`}</li>
                <li>{productById?.price && `Price: ${productById?.price}`}</li>
            </ul>
        </div>
    );
};

export default GetProductById;
