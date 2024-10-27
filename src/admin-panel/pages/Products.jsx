import { getAllProducts } from "../../store/slice/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { deleteProduct } from "../../store/slice/productSlice";
import "../style/pages/products.css";
import { useNavigate } from "react-router-dom";
import "../../style/global.css";
import { toast } from "react-toastify";
import editTextImage from "../assets/image/edit-text.png";
import deleteDocumentImage from "../assets/image/delete-document.png";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch all products when the component mounts
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Get all products
  const allProducts = useSelector((state) => state?.product?.allProducts);
  const loading = useSelector((state) => state.product.loading);

  return (
    <div className="ms-4" style={{ marginTop: "5rem" }}>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
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
              <div className="card-body">
                <div class="d-flex justify-content-around">
                  <img
                    src={editTextImage}
                    alt=""
                    style={{ width: "1.4rem", height: " 1.4rem" }}
                    onClick={() =>
                      navigate("/admin-panel/products/edit-product", {
                        state: { product },
                      })
                    }
                  />
                  <img
                    src={deleteDocumentImage}
                    alt=""
                    style={{ width: "1.4rem", height: " 1.4rem" }}
                    onClick={() => {
                      dispatch(deleteProduct({ productId: product?._id })).then(
                        (res) => {
                          if (res?.payload?.success) {
                            toast.success("Product deleted successfully!");
                            dispatch(getAllProducts());
                          }
                        }
                      );
                    }}
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
