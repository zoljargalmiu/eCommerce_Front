import axios from "axios"
import {useEffect, useState } from "react"
import {Link, useNavigate,useParams} from "react-router-dom"
import EmployeeService from "../service/EmployeeService"
import jwt_decode from "jwt-decode";
import moment from "moment";
import {cookies} from "../helpers/cookies";

const LoginComponent = () =>{
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()
    const [user,setUser] = useState([])


    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        console.log('user object details: ',user)


        const userData = 
        {
            userName,
            password,
        };

            axios.post(`http://localhost:8080/api/auth/authenticate`,userData).then(response=>{
                console.log("response:" + response);

                const token = response.data.jwt;
                const userData = response.data.userDetail;

                console.log(userData);

                cookies.set("Token", token, {
                    secure: false,
                    expires: new Date(moment().add(userData.exp).format()),
                  });

                localStorage.setItem("userName",userData.userName);

                localStorage.setItem("data",JSON.stringify(userData));

                navigate('/product')
            }).catch(err=>console.log(err))

    }

    return(
        <div>
            <div className="container">
                <br /> <br />
                <div className="row" >
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 className='text-center'>Login</h2>
                        <div className="card-body">
                            <form >

                            <div className="form-group mb-2">
                                    <label className="form-label"> Username:</label>
                                    <input type="text" placeholder='Enter Your Username' name='username' className='form-control'
                                    value={userName}
                                    onChange={(e)=>setUserName(e.target.value)}/>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Password:</label>
                                    <input type="password" placeholder='Enter Your Password' name='password' className='form-control'
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}/>
                                </div>


                                <button onClick={(e)=>saveOrUpdateEmployee(e)}className='btn btn-success'>Login</button>
                                    &nbsp;
                                <Link to='/add-user' className='btn btn-danger'>Register</Link>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginComponent