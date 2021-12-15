import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterUserComponent from "./components/RegisterUserComponent";
import AddProductComponent from "./components/AddProductComponent";
import DynamicFormComponent from "./components/DynamicFormComponent";
import ProductDetails from "./containers/ProductDetails";
import ProductListing from "./containers/ProductListing";
import SellerProductComponent from "./components/SellerProductComponent";
import UpdateUserStateComponent from "./components/UpdateUserStateComponent";
import LoginComponent from "./components/LoginComponent";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginComponent />} />

          <Route exact path="/product" element={<ProductListing />} />
          <Route path="/product/:productId" element={<ProductDetails />} />

          <Route path="/add-user" element={<RegisterUserComponent />} />
          <Route path="/add-product" element={<AddProductComponent />} />

          <Route path="/show-dynamic" element={<DynamicFormComponent />} />

          <Route path="/list-products" element={<SellerProductComponent />} />

          <Route path="/edit-product/:id" element={<AddProductComponent />} />

          <Route
            path="/view-user-status"
            element={<UpdateUserStateComponent />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
