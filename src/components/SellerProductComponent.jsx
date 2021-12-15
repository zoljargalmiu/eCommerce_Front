import React, { useState, useEffect } from "react";
import {  useNavigate,Link} from "react-router-dom";
import axios from "axios";
import HeaderComponent from "./HeaderComponent";

const SellerProductComponent = () => {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadProducts()
  },[]);

  const loadProducts = ()=>{
    axios
      .get("http://localhost:8080/api/products/list-products/1")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((err) => console.log(err));

      console.log('loadFunction is called')
  }

  const deleteProduct = (id)=>{

      if(window.confirm('are you sure to delete')){

       const request = async()=>{
            return await axios.delete(`http://localhost:8080/api/products/${id}`);
        }
        request();
      }
     
      navigate('/')
      
  }

  return (
    <div>
      <HeaderComponent/>
      <br /> <br />
      <div className="row">
        <div className="card col-md-8 offset-md-2 ">
          <h2 className="text-center">Inserted Products List</h2>
          <div className="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">Image</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product,x) => {
                  return [
                    <tr key={x}>
                      <th scope="row">{++x}</th>
                  
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>
                      <div class="d-flex align-items-center">
                          <img class="rounded-circle" src={product.image} width="40" alt="" />
                     </div>
                          
                          </td>
                      <td>
                      <Link  class="btn btn-outline-dark btn-sm" to={`/edit-product/${product.id}`}>Edit</Link>

                           &nbsp; <button type="button" class="btn btn-outline-danger btn-sm" onClick={()=>{
                                deleteProduct(product.id)
                           }}>Delete</button></td>
                    </tr>
                  ];
                })}
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProductComponent;
