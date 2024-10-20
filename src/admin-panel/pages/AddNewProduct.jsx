import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebaseConfig.js";
import { useDispatch } from "react-redux";
import { createProduct } from "../../store/slice/productSlice.js";
import { toast } from "react-toastify";

const AddNewProduct = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product: initialProduct } = location.state || {};

  const [product, setProduct] = useState(initialProduct || {});
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!product.name || product.name.trim() === "") {
      newErrors.name = "Product name is required.";
    }

    if (!product.description || product.description.trim() === "") {
      newErrors.description = "Product description is required.";
    }

    if (!product.price || isNaN(product.price)) {
      newErrors.price = "Valid product price is required.";
    }

    if (!product.category || product.category === "") {
      newErrors.category = "Please select a product category.";
    }

    if (!product.stock || isNaN(product.stock)) {
      newErrors.stock = "Valid stock number is required.";
    }

    if (!imageFile) {
      newErrors.imageFile = "Product image is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsUploading(true);
    try {
      let imageUrl = product.imageUrl || "";

      if (imageFile) {
        // Upload the image to Firebase Storage
        const storageRef = ref(storage, `products/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const updatedProduct = { ...product, imageUrl };

      // Dispatch the action to create a new product
      const productData = {
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
        category: updatedProduct.category,
        image: imageUrl,
        stock: updatedProduct.stock,
      };

      dispatch(createProduct(productData)).then((data) => {
        if (data?.payload?.success) {
          toast.success(data?.payload?.message);
        }
      });
      navigate("/admin-panel/products");
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <div className="d-flex justify-content-between shadow ms-3 py-2 mb-3 container-fluid">
        <div>
          <h4>Add New Product</h4>
        </div>
      </div>

      <div className="container mt-4">
        {product ? (
          <div className="card w-75 mb-5 mx-auto shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSaveChanges}>
                <div className="mb-3 row">
                  <label
                    htmlFor="productImage"
                    className="col-sm-3 col-form-label"
                  >
                    Product Image :
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="file"
                      className={`form-control ${
                        errors.imageFile ? "is-invalid" : ""
                      }`}
                      id="productImage"
                      name="productImage"
                      onChange={handleFileChange}
                    />
                    {errors.imageFile && (
                      <div className="invalid-feedback">{errors.imageFile}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">
                    Product Name:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    id="productName"
                    name="name"
                    value={product.name || ""}
                    onChange={handleInputChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="productDescription" className="form-label">
                    Product Description:
                  </label>
                  <textarea
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    id="productDescription"
                    name="description"
                    rows="3"
                    value={product.description || ""}
                    onChange={handleInputChange}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="productPrice" className="form-label">
                      Product Price:
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.price ? "is-invalid" : ""
                      }`}
                      id="productPrice"
                      name="price"
                      value={product.price || ""}
                      onChange={handleInputChange}
                    />
                    {errors.price && (
                      <div className="invalid-feedback">{errors.price}</div>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="productCategory" className="form-label">
                      Product Category:
                    </label>
                    <select
                      className={`form-select ${
                        errors.category ? "is-invalid" : ""
                      }`}
                      id="productCategory"
                      name="category"
                      value={product.category || ""}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Category</option>
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                    </select>
                    {errors.category && (
                      <div className="invalid-feedback">{errors.category}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="productStock" className="form-label">
                    Product Stock:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.stock ? "is-invalid" : ""
                    }`}
                    id="productStock"
                    name="stock"
                    value={product.stock || ""}
                    onChange={handleInputChange}
                  />
                  {errors.stock && (
                    <div className="invalid-feedback">{errors.stock}</div>
                  )}
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-warning mx-auto"
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : "Add Product"}
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
