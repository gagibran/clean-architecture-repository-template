import ProductEntity from '../entities/productEntity';
import Product from './Product';
import styles from '../styles/Product.module.css';

interface Props {
    products: ProductEntity[]
};

const GetAllProducts = ({ products }: Props) => {
    return (
        <div className={styles['product__products-section']}>
            <h2>All Products</h2>
            {products.length ?
            products.map(product => {
                return (
                    <Product key={product.id} product={product} />
                );
            }) :
            <p className={styles['product__no-products']}>
                No products to display.
            </p>}
        </div>
    );
};

export default GetAllProducts;
