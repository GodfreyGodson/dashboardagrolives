import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
//import { Toast } from "react-toastify/dist/components";
//import { Toast } from "react-toastify/dist/components";
//import { Toast } from "react-toastify/dist/components";
import { createCategory } from "../../Redux/Actions/CategoryActions";
import { createSlider } from "../../Redux/Actions/SliderActions";
import { CATEGORY_CREATE_RESET } from "../../Redux/Constants/CategoryConstants";
import { SLIDER_CREATE_RESET } from "../../Redux/Constants/SliderConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const CreateCategory = () => {
  const [sliderName, setsliderName] = useState("")
  const [sliderDescription, setsliderDescription] = useState("")
  const [sliderImage, setsliderImage] = useState("")

  const dispatch = useDispatch()

  const sliderCreate = useSelector((state)=>state.sliderCreate)
  const {loading, error, slider} = sliderCreate

  useEffect(()=>{
    if (slider) {
      toast.success("Category Added", ToastObjects)
      dispatch({type:SLIDER_CREATE_RESET})
      setsliderName("")
      setsliderDescription("")
      setsliderImage("")
    }
     }, [slider, dispatch]);


     const submitHandler = (e) => {
      e.preventDefault()
      dispatch(createSlider(sliderName, sliderDescription,  sliderImage))
     }

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
            value={sliderName}
            onChange={(e) => setsliderName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Images</label>
          <input className="form-control" type="file" 
            required
            value={sliderImage}
            onChange={(e) => setsliderImage(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="form-label">Description</label>
          <textarea
            placeholder="Type here"
            className="form-control"
            rows="4"
            required
            value={sliderDescription}
            onChange={(e) => setsliderDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="d-grid">
          <button className="btn btn-primary py-3">Create slider</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default CreateCategory;
