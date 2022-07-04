import { FormEvent } from 'react';
import useFindProductById from '../hooks/useFindProductById';

const GetProductById = () => {
    const [product, setProductByIdAsync] = useFindProductById();

    const getProductByIdHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => {
        await setProductByIdAsync(inputEvent.currentTarget.value)
    };

    return (
        <div>
            <h2>Get Product By ID</h2>
            <label htmlFor="getProductById">Product ID</label>
            <input type="text" id="getProductById" onChange={getProductByIdHandlerAsync} />
            <ul>
                <li>{product?.id && `ID: ${product?.id}`}</li>
                <li>{product?.name && `Product Name: ${product?.name}`}</li>
                <li>{product?.price && `Price: ${product?.price}`}</li>
            </ul>
        </div>
    );
};

export default GetProductById;
