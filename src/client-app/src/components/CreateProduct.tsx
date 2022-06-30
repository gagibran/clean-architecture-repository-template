import { FormEvent, useState } from 'react';
import { createProductAsync } from '../api/productRequests';
import ProductEntity from '../entities/productEntity';

interface Props {
    setProducts: React.Dispatch<React.SetStateAction<ProductEntity[]>>
}

interface CreatedProduct {
    name: string,
    price: number
}

const CreateProduct = ({ setProducts }: Props) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);

    const createProductNameHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => setProductName(inputEvent.currentTarget.value);

    const createProductPriceHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => setProductPrice(+inputEvent.currentTarget.value);

    const createFormSubmitHandlerAsync = async (formEvent: FormEvent) => {
        formEvent.preventDefault();
        const productToBeCreated: CreatedProduct = {
            name: productName,
            price: productPrice
        };
        const createdProduct = await createProductAsync(productToBeCreated);
        if (createdProduct !== undefined) {
            setProducts(prevProducts => [ ...prevProducts, createdProduct ]);
        }
    };

    return (
        <div>
            <h2>Create Product</h2>
            <form onSubmit={createFormSubmitHandlerAsync}>
                <label htmlFor="name">Product Name</label>
                <input
                    type="text"
                    id="name"
                    onChange={createProductNameHandlerAsync}
                    required
                    />
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    id="price"
                    onChange={createProductPriceHandlerAsync}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateProduct;
