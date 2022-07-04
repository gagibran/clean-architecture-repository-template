import { FormEvent, useReducer } from 'react';
import { updateByIdAsync } from '../api/requests';
import { PRODUCT_API_BASE_URL } from '../common/constants/productConstants';
import ProductEntity from '../entities/productEntity';
import useFindProductById from '../hooks/useFindProductById';

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

const UpdateProductById = ({ fetchProductsAsync }: Props) => {
    const [productToBeUpdated, setProductToBeUpdatedByIdAsync] = useFindProductById();
    const [productState, productDispatcher] = useReducer(productReducer, INITIAL_PRODUCT_STATE);

    const getProductToBeUpdatedByIdHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) => {
        productDispatcher({
            type: AvailableProductActions.SetId,
            payload: { productId: inputEvent.currentTarget.value }
        });
        await setProductToBeUpdatedByIdAsync(inputEvent.currentTarget.value);
    };

    const updateProductNameHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) =>
        productDispatcher({
            type: AvailableProductActions.SetName,
            payload: { productName: inputEvent.currentTarget.value }
        });

    const updateProductPriceHandlerAsync = async (inputEvent: FormEvent<HTMLInputElement>) =>
        productDispatcher({
            type: AvailableProductActions.SetPrice,
            payload: { productPrice: +inputEvent.currentTarget.value }
        });

    const updateProductSubmitHandlerAsync = async (formEvent: FormEvent) => {
        formEvent.preventDefault();
        if (!productToBeUpdated) {
            return;
        }
        const newProduct: ProductEntity = {
            name: productState.productName ?? '',
            price: productState.productPrice ?? 0
        };
        await updateByIdAsync<ProductEntity>(PRODUCT_API_BASE_URL, newProduct, productState.productId ?? '');
        await fetchProductsAsync();
    };

    return (
        <form onSubmit={updateProductSubmitHandlerAsync}>
            <h2>Update Product</h2>
            <label htmlFor="getProductToBetUpdatedById"></label>
            <input
                type="text"
                id="getProductToBetUpdatedById"
                onChange={getProductToBeUpdatedByIdHandlerAsync}
            />
            <label htmlFor="productNameUpdate">Product Name</label>
            <input
                type="text"
                id="productNameUpdate"
                onChange={updateProductNameHandlerAsync}
                defaultValue={productToBeUpdated?.name}
            />
            <label htmlFor="productPriceUpdate">Price</label>
            <input
                type="number"
                id="productPriceUpdate"
                onChange={updateProductPriceHandlerAsync}
                defaultValue={productToBeUpdated?.price}
            />
            <button type="submit">Update Product</button>
        </form>
    );
};

export default UpdateProductById;
