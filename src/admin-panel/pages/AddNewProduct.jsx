import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const AddNewProduct = () => {
  const location = useLocation();
  const navigate = useNavigate(); // To navigate after saving changes
  const { product: initialProduct } = location.state || {};

  // Use state to manage product modifications
  const [product, setProduct] = useState(initialProduct || {});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Perform save operation (e.g., API call) with the modified product
    console.log("Saved product:", product);
    navigate("/admin-panel/products");
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <div className="d-flex justify-content-between shadow ms-3 py-2 mb-3 container-fluid ">
        <div>
          <h4>Add New Product</h4>
        </div>
      </div>

      <div className="container mt-4">
        {product ? (
          <div className="card w-75 mb-5 mx-auto shadow-sm">
            <div className="card-body">
              {/* Form to edit product */}
              <form onSubmit={handleSaveChanges}>
                <div className="mb-3 d-flex ">
                  <label htmlFor="productImage" className="form-label w-25 ">
                    Product Image :
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="productImage"
                    name="name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">
                    Product Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange} // Make editable
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="productDescription" className="form-label">
                    Product Description:
                  </label>
                  <textarea
                    className="form-control"
                    id="productDescription"
                    name="description"
                    rows="3"
                    value={product.description}
                    onChange={handleInputChange} // Make editable
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="productPrice" className="form-label">
                      Product Price:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="productPrice"
                      name="price"
                      value={product.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="productCategory" className="form-label">
                      Product Category:
                    </label>
                    <select
                      class="form-select form-select mb-3"
                      id="productCategory"
                      name="category"
                      aria-label="Large select example"
                    >
                      <option selected>Men</option>
                      <option value="1">Women</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="productStock" className="form-label">
                    Product Stock:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productStock"
                    name="stock"
                    value={product.stock}
                    onChange={handleInputChange} // Make editable
                  />
                </div>

                {/* Save Changes Button */}
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-warning mx-auto">
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <h5 className="text-center text-danger">No product data available</h5>
        )}
      </div>
    </div>
  );
};

export default AddNewProduct;
