import axios from "axios";

const BASE_URL = "http://localhost:8080/api/employees";
class EmployeeService{
    findAll(){
        return axios.get(BASE_URL)
    }

    save(employee){
        return axios.post(BASE_URL,employee)
    }

    findById(id){
        return axios.get(`${BASE_URL}/${id}`)
    }

    update(id,employee){
        return axios.put(`${BASE_URL}/${id}`,employee)
    }
}

export default new EmployeeService()