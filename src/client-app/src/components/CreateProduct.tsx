import { FormEvent, useReducer, useState } from 'react';
import { createAsync } from '../api/requests';
import { PRODUCT_API_BASE_URL } from '../common/constants/productConstants';
import ProductEntity from '../entities/productEntity';
import styles from '../styles/Product.module.css';

interface Props {
    fetchProductsAsync: () => Promise<void>
}

interface ProductAction {
    type: AvailableProductActions,
    payload: ProductState
}

interface ProductState {
    productId?: string,
    productName?: string,
    productPrice?: number
}

enum AvailableProductActions {
    SetId,
    SetName,
    SetPrice
};

const INITIAL_PRODUCT_STATE: ProductState = {
    productId: '',
    productName: '',
    productPrice: 0
};

const productReducer = (state = INITIAL_PRODUCT_STATE, action: ProductAction) => {
    switch (action.type) {
        case AvailableProductActions.SetId:
            return { ...state, productId: action.payload.productId};
        case AvailableProductActions.SetName:
            return { ...state, productName: action.payload.productName};
        case AvailableProductActions.SetPrice:
            return { ...state, productPrice: action.payload.productPrice }
        default:
            return state;
    }
};

const CreateProduct = ({ fetchProductsAsync }: Props) => {
    const [productState, productDispatcher] = useReducer(productReducer, INITIAL_PRODUCT_STATE);
    const [isProductCreated, setIsProductCreated] = useState(true);

    const createProductNameHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) =>
        productDispatcher({
            type: AvailableProductActions.SetName,
            payload: { productName: inputEvent.currentTarget.value }
        });

    const createProductPriceHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) =>
        productDispatcher({
            type: AvailableProductActions.SetPrice,
            payload: { productPrice: +inputEvent.currentTarget.value }
        });

    const createProductSubmitHandlerAsync = async (formEvent: FormEvent) => {
        try {
            formEvent.preventDefault();
            if (!productState.productName || !productState.productPrice) {
                return;
            }
            const createdProduct = {
                name: productState.productName,
                price: productState.productPrice
            };
            await createAsync<ProductEntity>(PRODUCT_API_BASE_URL, createdProduct);
            setIsProductCreated(true);
            await fetchProductsAsync();
        } catch (error) {
            console.log(error);
            setIsProductCreated(false);
        }
    };

    return (
        <form
            className={styles['product__products-section']}
            onSubmit={createProductSubmitHandlerAsync}
        >
            <h2>Create Product</h2>
            <label htmlFor="productNameCreate">Product Name</label>
            <input
                type="text"
                id="productNameCreate"
                onChange={createProductNameHandlerAsync}
                required
                />
            <label htmlFor="productPriceCreate">Price</label>
            <input
                type="number"
                step="0.01"
                id="productPriceCreate"
                onChange={createProductPriceHandlerAsync}
                required
            />
            {!isProductCreated ?
            <p className={styles['product-section__no-products']}>
                Product could not be created.
            </p> :
            null}
            <button type="submit">Create Product</button>
        </form>
    );
};

export default CreateProduct;
