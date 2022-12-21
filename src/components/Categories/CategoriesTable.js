import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCategory, listCategories } from "../../Redux/Actions/CategoryActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
const CategoriesTable = () => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state)=> state.categoryList);
  const{ loading, error, categories } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete)
  const {error:errorDelete, success:successDelete} = categoryDelete

 

  useEffect(()=>{
 dispatch(listCategories());
  }, [dispatch]);


  const deletehandler=(categoryId)=>{
    if (window.confirm("Are you sure??")){
      dispatch(deleteCategory(categoryId))
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
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
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
             categories && categories.map((category, index)=> (
    
                <tr key={index}>
                <td>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" />
                  </div>
                </td>
                <td>{category.categoryId}</td>
                <td>
                  <b>{category.categoryName}</b>
                </td>
                <td>{category.categoryDescription}</td>
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
                      onClick={()=>deletehandler(category.categoryId)}>
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

export default CategoriesTable;
