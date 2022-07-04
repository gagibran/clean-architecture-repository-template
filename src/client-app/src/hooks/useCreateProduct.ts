import { useReducer } from 'react';
import AvailableProductActions from '../common/enums/availableProductActions';

interface ProductAction {
    type: AvailableProductActions,
    payload: ProductState
}

interface ProductState {
    productId?: string,
    productName?: string,
    productPrice?: number
}

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

const useCreateProduct = () => {
    return useReducer(productReducer, INITIAL_PRODUCT_STATE);
};

export default useCreateProduct;
