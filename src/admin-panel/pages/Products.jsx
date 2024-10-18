import { getAllProducts } from "../../store/slice/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import editTextImage from "../assets/image/edit-text.png";
import "../style/pages/products.css";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch all products when the component mounts
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Get all products
  const allProducts = useSelector((state) => state?.product?.allProducts);

  return (
    <div className="ms-4" style={{ marginTop: "5rem" }}>
      <div className="d-flex justify-content-between p-2 shadow mb-3 container-fluid ">
        <div>
          <h4>All Products</h4>
        </div>
        <div>
          <button
            className="btn btn-sm btn-warning"
            onClick={() => navigate("/admin-panel/products/add-new-product")}
          >
            Add New Product
          </button>
        </div>
      </div>

      <div className="row products-listing-admin-panel mx-auto">
        {allProducts?.data?.map((product) => (
          <div key={product._id} className="col-md-3 mb-3">
            <div className="card product-container">
              <div className="product-image card-body">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
              </div>
              <div className="card-body">
                <h6 className="card-title m-0 p-0">{product.name}</h6>
                <p className="card-text m-0 p-0">
                  {" "}
                  {product.description.slice(0, 50).toString() + "..."}
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Price: ₹{product.price}</li>
                <li className="list-group-item">Stock: {product.stock}</li>
                <li className="list-group-item">
                  Category: {product.category}
                </li>
              </ul>
              <div className="card-body d-flex justify-contetn-start edit-prodcut">
                {/* <div className="">Edit product</div> */}
                <div className="">
                  <img
                    src={editTextImage}
                    alt="edit"
                    onClick={() =>
                      navigate("/admin-panel/products/edit-product", {
                        state: { product },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
