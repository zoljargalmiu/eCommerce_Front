import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";

const AddProductComponent = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0.0);
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(
    "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg"
  );
  const [description, setDescription] = useState();
  const [category, setCategory] = useState("electronics");

  const [user, setUser] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadUser = async () => {
      const request = await axios.get("http://localhost:8080/api/users/1");
      console.log("requested data ", request.data);
      setUser(request.data);
    };
    loadUser();

    if(id !== undefined ){
      axios.get(`http://localhost:8080/api/products/${id}`).then(response=>{
        setTitle(response.data.title)
        setPrice(response.data.price)
        setQuantity(response.data.quantity)
        setImage(response.data.image)
        setDescription(response.data.description)
      }).catch(err=>console(err))
    }
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      const request = await axios.get("http://localhost:8080/api/users/1");
      console.log("requested data ", request.data);
      setUser(request.data);
    };
    loadUser();
  }, []);

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    console.log('user object contains: ',user)
    const productData = {
      title,
      price,
      description,
      quantity,
      category,
      image,
      user,
    };

    if (id !== undefined) {
      axios
        .put(`http://localhost:8080/api/products/${id}`, productData)
        .then((response) => {
          console.log("saved product:", response);
          navigate("/list-products");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
        console.log('product data is: ',productData)
      axios
        .post(`http://localhost:8080/api/products`, productData)
        .then((response) => {
          console.log("response from saved product:" + response);
  
          clearForm()
        })
        .catch((err) => console.log(err));

     
    }
  };

  const clearForm = ()=>{
      setCategory('electronics')
      setDescription('')
      setQuantity(0)
      setPrice(0.0)
      setTitle('')
      setImage('https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg')
  }

  return (
    <div>
      <HeaderComponent/>
      <div className="container">
        <br /> <br />
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center">
              {id !== undefined ? "Update Product" : "Insert Product"}
            </h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> Product:</label>
                  <input
                    type="text"
                    placeholder="Enter Product Name"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Price:</label>
                  <input
                    type="text"
                    placeholder="Enter product price"
                    name="price"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Image:</label>
                  <input
                    type="text"
                    placeholder="paste image link"
                    name="price"
                    className="form-control"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Quantity:</label>
                  <input
                    type="quantity"
                    placeholder="Enter Your quantity"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="form-group">
                <label className="form-label"> Category:</label>
                  <select class="form-control" value={category} onChange={(e)=>setCategory(e.target.value)}>
                    <option disabled>Default select</option>
                    <option value="men's clothing" >men's clothing</option>

                    <option value="jewelery" >jewelery</option>

                    <option value="electronics">electronics</option>

                    <option value="women's clothing" >women's clothing</option>
                  </select>

                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    rows="3"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <br />
                <button
                  onClick={(e) => saveOrUpdateEmployee(e)}
                  className="btn btn-success"
                >
                  Submit
                </button>
                &nbsp;
                <Link to="/" className="btn btn-danger">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddProductComponent;
