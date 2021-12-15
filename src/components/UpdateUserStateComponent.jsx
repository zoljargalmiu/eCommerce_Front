import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderComponent from "./HeaderComponent";

const UpdateUserStateComponent = () => {
  const [user, setUser] = useState([]);

  const [role,setRole] = useState('')
  const [status,setStatus] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users")
      .then((response) => {
        setUser(response.data);
        console.log(response.data)
      })
      .catch((err) => console.log(err));
  }, []);

  const updateRequest = (id)=>{
    const data = [role,status]
    
    axios.patch(`http://localhost:8080/api/users/${id}`,data).then(response=>{
      console.log(response.data)
      if(response.data){
        alert('Status successfully updated!')
      }else{
        alert('Something happened wrong')
      }
    }).catch(err=>console.log(err));
  }
  

  return (
    <div>
      <HeaderComponent/>
      <br /> <br />
      <div className="row">
        <div className="card col-md-8 offset-md-2 ">
          <h2 className="text-center">Update User Status</h2>
          <div className="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User-Name</th>
                  <th scope="col">Role</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {user.map((user, x) => {
                  return [
                    <tr key={x}>
                      <th scope="row">{++x}</th>

                      <td><b>{user.userName}</b></td>
                    
                      <td>
                        <select
                          class="form-control"
                          value={user.role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option disabled>Default select</option>
                          <option value="ADMIN">ADMIN</option>

                          <option value="SELLER">SELLER</option>

                          <option value="BUYER">BUYER</option>
                        </select>
                      </td>

                      <td>
                        <select
                          class="form-control"
                          value={user.status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option disabled>Default select</option>
                          <option value="PENDING">PENDING</option>

                          <option value="ACTIVE">ACTIVE</option>

                          <option value="DISABLED">DISABLED</option>
                        </select>
                      </td>
                      <td>
                        
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          onClick={() => updateRequest(user.id)}
                        >
                          Update
                        </button>
                      </td>
                    </tr>,
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

export default UpdateUserStateComponent;
