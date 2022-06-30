import ProductEntity from "../entities/productEntity";

interface Props {
    products: ProductEntity[]
};

const AllProducts = ({ products }: Props) => {
    return (
        <div>
            <h2>All Products</h2>
            {products.map(product => {
                return (
                    <ul key={product.id}>
                        <li>
                            <strong>ID</strong>: {product.id}
                        </li>
                        <li>
                            <strong>Product Name</strong>: {product.name}
                        </li>
                        <li>
                            <strong>Price</strong>: {product.price}
                        </li>
                    </ul>
                );
            })}
        </div>
    );
};

export default AllProducts;
