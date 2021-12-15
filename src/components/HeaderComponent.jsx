import { useState } from "react";
import { Link } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import Avatar from "../assets/avatar-1.jpg";
import { cookies } from "../helpers/cookies";

const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const userName = localStorage.getItem("userName");

function clickHandler()
{
  localStorage.removeItem("data");
  localStorage.removeItem("userName");
  cookies.remove("Token");
}
  
  return (
    <div>
      <div className="ui fixed menu">
        <div className="ui container center">
        
            <div class="header item active"><Link to='/product' >MY e-STORE</Link> </div>


            <span class="item"><Link to='/add-product' style={{textDecoration: 'none',color:"black"}}>ADD-PRODUCTS</Link></span>

            <span class="item"><Link to='/list-products' style={{textDecoration: 'none',color:"black"}}>SHOW-PRODUCTS</Link></span>

            
            <span class="item">
            <Link to='/view-user-status' style={{textDecoration: 'none',color:"black"}}>SHOW-USER-STATUS</Link>
            </span>
           
          </div>

          <div className="headerUser">
                    <div className="dropdown d-inline-block">
                      <OutsideClickHandler
                        onOutsideClick={() => (isOpen ? setIsOpen(false) : null)}
                      >
                        <button
                          type="button"
                          className="btn header-item waves-effect"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          <img
                            className="rounded-circle header-profile-user"
                            src={Avatar}
                            alt="Header Avatar"
                            height={35}
                          />
                          <p
                            className="d-none d-sm-inline-block ml-1"
                            style={{ color: "black", paddingLeft: 8 }}
                          >
                            {userName}
                          </p>

                          
                        </button>
                      </OutsideClickHandler>
                      <div
                        className={`dropdown-menu dropdown-menu-right ${
                          isOpen ? "show" : ""
                        }`}
                      >
                        <Link
                          className="dropdown-item"
                          to="/"
                          style={{ width: 230, color: "red" }}
                          onClick={clickHandler}
                        >
                          <i className="mdi mdi-logout font-size-16 align-middle mr-1"></i>
                          Sign Out
                        </Link>
                      </div>
                    </div>
           </div>
      </div>
      <br></br>
    </div>
  );
};

export default HeaderComponent;
