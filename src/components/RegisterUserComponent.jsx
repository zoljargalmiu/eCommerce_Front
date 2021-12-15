import axios from "axios"
import {useEffect, useState } from "react"
import {Link, useNavigate,useParams} from "react-router-dom"
import EmployeeService from "../service/EmployeeService"

const RegisterUserComponent = () =>{
    const [name,setName] = useState('')
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [role,setRole] = useState('')

    const navigate = useNavigate()
    const {id} = useParams();

    const [country,setCountry] = useState('')
    const [state,setState] = useState('')
    const [city,setCity] = useState('')
    const [zip,setZip] = useState('')

    const [user,setUser] = useState([])

    useEffect(()=>{
        const request = async()=>{
           const test =  await axios.get('http://localhost:8080/api/users/1')

           setUser(test.data)
            return test
        }
        request()
    },[])

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let status = role=="SELLER" ? "PENDING" : "ACTIVE"; 
        const address = {country,city,state,zip};

        console.log('user object details: ',user)


        const userData = 
        {name,
            userName,
            password,
            role,
            status,
            address
        };

        console.log("userdata:" + JSON.stringify(userData));

        if(id !== undefined){
            axios.put(`http://localhost:8080/api/users/${id}`,userData).then(response=>{
                console.log(response)
                navigate('/add-user')
            }).catch(err=>{
                console.log(err)
            })

            
        }else{

            axios.post(`http://localhost:8080/api/users`,userData).then(response=>{
                console.log("response:" + response);
                navigate('/add-user')
            }).catch(err=>console.log(err))
        }

    }

    return(
        <div>
            <div className="container">
                <br /> <br />
                <div className="row" >
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 className='text-center'>{id !== undefined ? 'Update Employee' : 'Add Emplolyee'}</h2>
                        <div className="card-body">
                            <form >
                                <div className="form-group mb-2">
                                    <label className="form-label"> Name:</label>
                                    <input type="text" placeholder='Enter Your Name' name='name' className='form-control'
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}/>
                                </div>

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

                                <div className="form-group mb-2">
                                    <label className="form-label"> Role:</label>
                                   <select name='role' value={role} id="role" 
                                   onChange={(e)=>setRole(e.target.value)}>
                                    <option selected>Please Select</option>
                                   <option value="SELLER" >Seller</option>
                                   <option value="BUYER" >Buyer</option>
                                   </select>
                                   
                                </div>
                                
                                <div className="form-group mb-2">
                                    <label className="form-label"> Country:</label>
                                    <input type="text"  name='country' className='form-control'
                                    value={country}
                                    onChange={(e)=>setCountry(e.target.value)}/>
                                </div>
                                
                                <div className="form-group mb-2">
                                    <label className="form-label"> State:</label>
                                    <input type="text" name='state' className='form-control'
                                    value={state}
                                    onChange={(e)=>setState(e.target.value)}/>
                                </div>
                                
                                <div className="form-group mb-2">
                                    <label className="form-label"> City:</label>
                                    <input type="text"  name='city' className='form-control'
                                    value={city}
                                    onChange={(e)=>setCity(e.target.value)}/>
                                </div>
                                
                                <div className="form-group mb-2">
                                    <label className="form-label"> zip:</label>
                                    <input type="text" name='zip' className='form-control'
                                    value={zip}
                                    onChange={(e)=>setZip(e.target.value)}/>
                                </div>

                                <button onClick={(e)=>saveOrUpdateEmployee(e)}className='btn btn-success'>Submit</button>
                                    &nbsp;
                                <Link to='/' className='btn btn-danger'>Cancel</Link>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default RegisterUserComponent