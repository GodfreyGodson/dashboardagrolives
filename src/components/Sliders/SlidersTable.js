import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCategory, listCategories } from "../../Redux/Actions/CategoryActions";
import { deleteSlider, listSliders } from "../../Redux/Actions/SliderActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
const SlidersTable = () => {
  const dispatch = useDispatch();

  const sliderList = useSelector((state)=> state.sliderList);
  const{ loading, error, sliders } = sliderList;

  const sliderDelete = useSelector((state) => state.sliderDelete)
  const {error:errorDelete, success:successDelete} = sliderDelete

 

  useEffect(()=>{
 dispatch(listSliders());
  }, [dispatch]);


  const deletehandler=(sliderId)=>{
    if (window.confirm("Are you sure??")){
      dispatch(deleteSlider(sliderId))
    }
  }
 
  return (
    <div className="col-md-12 col-lg-8">

      <table className="table">
        
        <thead>
          <tr>
            <th>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </th>
            {/* <th>ID</th> */}
            <th>Name</th>
            {/* <th>Description</th> */}
            <th className="text-end">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
        {
          errorDelete && 
          (
            <Message variant ="alert-danger">{errorDelete}</Message>
            )
        }
        {
          loading ?<Loading/>:error ? <Message variant="alert-danger">{error}</Message>:
          (
           
            <tbody>
         
        
         
            
              {
             sliders && sliders.map((slider, index)=> (
    
                <tr key={index}>
                <td>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" />
                  </div>
                </td>
                <td>
                <td>
                  <b>{slider.sliderName}</b>
                </td>
                  <b>{slider.sliderId}</b>
                  </td>
                
                {/* <td>
              <b>{slider.sliderDescription}</b>
                </td> */}
                <td className="text-end">
                  <div className="dropdown">
                    <Link
                      to="#"
                      data-bs-toggle="dropdown"
                      className="btn btn-light"
                    >
                      <i className="fas fa-ellipsis-h"></i>
                    </Link>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="#">
                        Edit info
                      </Link>
                      <Link 
                      className="dropdown-item text-danger" 
                      to="#"
                      // onClick={()=>deletehandler(slider.sliderId)}
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
    
               ))
             }
    
            
            
            
            
            </tbody>
          )
     
          
        }
   
      </table>
    </div>
  );
};

export default SlidersTable;
