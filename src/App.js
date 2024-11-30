import './variables.css';
import './components/css/common.css';
import Signup from './components/Signup';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import axios from 'axios';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import ViewEmployee from './components/ViewEmployee';

function App() {

  let SERVER_BASEURL = 'https://assignment.comp3123.britto.tech/api/v1';
  
  const axiosInstance = axios.create({
    baseURL: SERVER_BASEURL,
    timeout: 5000
  });

  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login axiosInstance={axiosInstance} />} />
        <Route path="/login" element={<Login axiosInstance={axiosInstance} />} />
        <Route path="/signup" element={<Signup axiosInstance={axiosInstance} />} />
        <Route path='/employeelist' element={<EmployeeList axiosInstance={axiosInstance} />} />
        <Route path='/addemployee' element={<AddEmployee axiosInstance={axiosInstance} />} />
        <Route path='/viewemployee/:emp_id' element={<ViewEmployee axiosInstance={axiosInstance}/>} />
        
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
