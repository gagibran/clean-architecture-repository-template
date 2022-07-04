import { FORMATTER } from '../common/constants/productConstants';
import ProductEntity from '../entities/productEntity';
import styles from '../styles/Product.module.css';

interface Props {
    product: ProductEntity
}

const Product = ({ product }: Props) => {
    return (
        <div className={styles['product__product-container']}>
            <p><strong>{product.name}</strong></p>
            <p><strong>ID</strong>: {product.id}</p>
            <p><strong>{FORMATTER.format(product.price)}</strong></p>
        </div>
    );
};

export default Product;
