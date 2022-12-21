import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
//import { Toast } from "react-toastify/dist/components";
//import { Toast } from "react-toastify/dist/components";
//import { Toast } from "react-toastify/dist/components";
import { createCategory } from "../../Redux/Actions/CategoryActions";
import { CATEGORY_CREATE_RESET } from "../../Redux/Constants/CategoryConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const CreateCategory = () => {
  const [categoryName, setcategoryName] = useState("")
  const [categoryDescription, setcategoryDescription] = useState("")
  const [categoryImage, setcategoryImage] = useState("")

  const dispatch = useDispatch()

  const categoryCreate = useSelector((state)=>state.categoryCreate)
  const {loading, error, category} = categoryCreate

  useEffect(()=>{
    if (category) {
      toast.success("Category Added", ToastObjects)
      dispatch({type:CATEGORY_CREATE_RESET})
      setcategoryName("")
      setcategoryDescription("")
      setcategoryImage("")
    }
     }, [category, dispatch]);


     const submitHandler = (e) => {
      e.preventDefault()
      dispatch(createCategory(categoryName, categoryDescription,  categoryImage))
     }

     const handleFileChange = (e) => {
      if (e.target.files) {
        setcategoryImage(e.target.files[0, categoryImage]);
      }
    };

  return (
    <>
   
   < ToastContainer/>
    <div className="col-md-12 col-lg-4">
      <form onSubmit={ submitHandler}>
        <div className="mb-4">
          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading />}
          <label htmlFor="product_name" className="form-label">
            Name
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            id="product_name"
            required
            value={categoryName}
            onChange={(e) => setcategoryName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Images</label>
          <input className="form-control" type="file" 
            required
            value={categoryImage}
            onChange={ handleFileChange}
         />
        </div>
        <div className="mb-4">
          <label className="form-label">Description</label>
          <textarea
            placeholder="Type here"
            className="form-control"
            rows="4"
            required
            value={categoryDescription}
            onChange={(e) => setcategoryDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="d-grid">
          <button className="btn btn-primary py-3">Create category</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default CreateCategory;
