import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
const DUMMY_PRDOCUTS = [
  {
    id: "p1",
    price: 6,
    title: "My First book",
    description: "The first book i write!",
  },
  {
    id: "p2",
    price: 12,
    title: "My Second book",
    description: "The second book i write!",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRDOCUTS.map((product) => (
          <ProductItem
            id = {product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
