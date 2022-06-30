import { FormEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { getAllProductsAsync, getProductByIdAsync, createProductAsync } from '../api/productRequests';
import ProductGet from '../entities/productGet';
import ProductPost from '../entities/productPost';

interface CreateProductAction {
    type: string,
    payload: ProductPost
}

const CREATE_PRODUCT_ACTION_TYPES = {
    name: 'NAME',
    price: 'PRICE',
};

const DEFAULT_CREATED_PRODUCT: ProductPost = {
    name: '',
    price: 0
};

const productReducer = (state: ProductPost, action: CreateProductAction): ProductPost => {
    switch (action.type) {
        case CREATE_PRODUCT_ACTION_TYPES.name:
            return { ...state, name: action.payload.name }
        case CREATE_PRODUCT_ACTION_TYPES.price:
            return { ...state, price: action.payload.price }
        default:
            return DEFAULT_CREATED_PRODUCT;
    }
};

const Product = () => {
    const [products, setProducts] = useState<ProductGet[]>([]);
    const [productById, setProductById] = useState<ProductGet>();
    const [createProductState, dispatchCreateProduct] = useReducer(productReducer, DEFAULT_CREATED_PRODUCT);

    const fetchProductsAsync = useCallback(async () => {
        const products = await getAllProductsAsync();
        setProducts(products ?? []);
    }, []);

    const mapProductsToListIem = () => {
        return (
            products.map(product => {
                return (
                    <li key={product.id}>
                        {`ID ${product.id};
                        Product Name: ${product.name};
                        Price: ${product.price}`}
                    </li>
                );
            })
        );
    };

    const getProductByIdHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => {
        const foundProduct = await getProductByIdAsync(inputEvent.currentTarget.value);
        setProductById(foundProduct);
    };

    const createProductNameHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => dispatchCreateProduct({
        type: CREATE_PRODUCT_ACTION_TYPES.name,
        payload: { name: inputEvent.currentTarget.value }
    });

    const createProductPriceHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => dispatchCreateProduct({
        type: CREATE_PRODUCT_ACTION_TYPES.name,
        payload: { name: inputEvent.currentTarget.value }
    });

    const createFormSubmitHandlerAsync = async (formEvent: FormEvent) => {
        formEvent.preventDefault();
        const createdProduct = await createProductAsync(createProductState);
        if (createdProduct !== undefined) {
            setProducts(prevProducts => [ ...prevProducts, createdProduct ]);
        }
    };

    useEffect(() => {
        fetchProductsAsync();
    }, [fetchProductsAsync]);

    return (
        <section>
            <div>
                <h2>All Products</h2>
                <ul>
                    {mapProductsToListIem()}
                </ul>
            </div>
            <div>
                <h2>Get Product By ID</h2>
                <label htmlFor="getProductById">Product ID</label>
                <input type="text" id="getProductById" onChange={getProductByIdHandlerAsync} />
                <p>{productById &&
                    `ID ${productById.id};
                    Product Name: ${productById.name};
                    Price: ${productById.price}`}
                </p>
            </div>
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
        </section>
    );
};

export default Product;
