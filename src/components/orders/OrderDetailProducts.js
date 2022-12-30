import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {  useLocation } from 'react-router-dom';
const OrderDetailProducts = () => {
   
  const orderList = useSelector((state)=>state.orderList)
 
  const {loading, error,orders} = orderList;
  let {pathname} = useLocation();
  const id = pathname.replace(`/order/`,'')
 const products = orders.filter(order=>order._id===id)
//  console.log(products)
  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Product</th>
          <th style={{ width: "20%" }}>Unit Price</th>
          {/* <th style={{ width: "20%" }}>Quantity</th> */}
          <th style={{ width: "20%" }} className="text-end">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
       { products.length>0 &&  products[0].products.length>0&& products[0].products.map((product)=>(
        <tr key={product.productId}>
          <td>
            <Link className="itemside" to="#">
              <div className="left">
               
              </div>
              <div className="info">
              {product.productName}
              </div>
            </Link>
          </td>
          <td>Tsh {product.productSalePrice}</td>
          {/* <td>3 </td> */}
          <td className="text-end"> {product.productSalePrice}</td>
        </tr>))
}
        <tr>
          <td colSpan="4">
            <article className="float-end">
              {/* <dl className="dlist">
                <dt>Subtotal:</dt> <dd>Tsh3,556</dd>
              </dl>
              <dl className="dlist">
                <dt>Shipping cost:</dt> <dd>Tsh56,907</dd>
              </dl> */}
              <dl className="dlist">
                <dt>Grand total:</dt>
                <dd>
                  <b className="h5">Tsh{products[0].grandTotal}</b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Status:</dt>
                <dd>
                  <span className="badge rounded-pill alert alert-success text-success">
                    Payment done
                  </span>
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
