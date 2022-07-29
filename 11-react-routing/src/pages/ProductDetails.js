import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const params = useParams();
    
  return (
    <section>
      <h1>Product Details</h1>
      <h4>{params.productId}</h4>
    </section>
  );
};
export default ProductDetails;
