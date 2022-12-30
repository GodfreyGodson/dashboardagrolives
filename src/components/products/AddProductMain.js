import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createProduct } from "../../Redux/Actions/ProductActions";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast, ToastContainer } from "react-toastify";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const AddProductMain = () => {
      
  const [productName, setproductName] = useState("")
  const [productShortDescription, setproductShortDescription] = useState("")
  const [productDescription, setproductDescription] = useState("")
  const [productPrice, setproductPrice] = useState("")
  const [productSalePrice, setproductSalePrice] = useState("")
  const [productImage, setproductImage] = useState(null)
  const [productSKU, setproductSKU] = useState("")
  const [stockStatus, setstockStatus] = useState("")
  const [category, setcategory] = useState("")

  const dispatch = useDispatch()

  const productCreate = useSelector((state)=>state.productCreate)
  const {loading, error, product} = productCreate

  useEffect(()=>{
    if (product) {
      toast.success("Product Added", ToastObjects)
      dispatch({type:PRODUCT_CREATE_RESET})
      setproductName("")
      setproductShortDescription("")
      setproductDescription("")
      setproductPrice("")
      setproductSalePrice("")
      setproductImage(null)
      setproductSKU("")
      setstockStatus("")
      setcategory("")
    }
     }, [product, dispatch]);


     const submitHandler = (e) => {
      e.preventDefault()
      dispatch(createProduct(productName, category,  productShortDescription, productDescription, productPrice, productSalePrice, productImage, productSKU, stockStatus))
     }

     const handleFileChange = (e) => {
      if (e.target.files) {
        setproductImage(e.target.files[0]);
      }
    };
  return (
    <>
   
   < ToastContainer/>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={ submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Product title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={productName}
                      onChange={(e) => setproductName(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      category
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={category}
                      onChange={(e) => setcategory(e.target.value)}
                    />
                  </div>

                  
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      productShortDescription
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={productShortDescription}
                      onChange={(e) => setproductShortDescription(e.target.value)}
                    />
                  </div>


                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      productPrice
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={productPrice}
                      onChange={(e) => setproductPrice(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      productSalePrice
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={productSalePrice}
                      onChange={(e) => setproductSalePrice(e.target.value)}
                    />
                  </div>

                  
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      productSKU
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={productSKU}
                      onChange={(e) => setproductSKU(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Count In Stock 
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={stockStatus}
                      onChange={(e) => setstockStatus(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">productDescription</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      value={productDescription}
                      onChange={(e) => setproductDescription(e.target.value)}
                    ></textarea>
                  </div>
        <div className="mb-4">
                    <label className="form-label">Images</label>
                    <input
                      className="form-control"
                      type="file"
                      required
         
                      onChange={ handleFileChange}
                    />
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
