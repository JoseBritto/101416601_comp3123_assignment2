import { useEffect, useState, useReducer } from 'react';
import './css/employeelist.css';
import Header from './Header';
import { useNavigate } from "react-router";

export default function EmployeeList( { axiosInstance, navigation }) {
    
    let navigate = useNavigate();
    const [update, forceUpdate] = useReducer(x => x + 1, 0);

    let [empList, setEmpList] = useState(null);

    const fetchEmp = () => {
        axiosInstance
        .get('/emp/employees')
        .then(function (response) {
            console.log(response);
            if(response.status === 200) {
                console.log(response.data);
                setEmpList(response.data);
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    }

    const deleteEmp = (empId) => {
        axiosInstance
        .delete('/emp/employees/'+ empId)
        .then(function (response) {
            console.log(response);
            if(response.status === 200) {
                navigate('/employeelist');
            }
            forceUpdate();
            setEmpList(null);
        }).catch(error => {
            console.error('Error:', error);
            alert('Delete Failed!');
        });
    }

    useEffect(() => {
        fetchEmp();
    }, [update]);
    
    return (
        <>
            <Header />
            <div className='employeelist'>
                <div className='top'>
                    <div className='left'>
                        <h1>
                            Employees
                        </h1>
                        <p>Viewing 58 Employees</p>
                    </div>
                    <div className='right'>
                        <button onClick={() => navigate('/addemployee')}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00024E"><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/></svg>
                            Add Employee
                        </button>    
                    </div>
                </div>
                {empList ? (

                <table>
                <thead>
                    <tr>
                        <th>
                            <div>
                                <span>Name</span>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 900" width="24px" fill="#000000"><path d="m280-400 200-200 200 200H280Z"/></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-360 280-560h400L480-360Z"/></svg>
                                </button>
                            </div>
                        </th>
                        <th>
                            <div>
                                <span>Email</span>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 900" width="24px" fill="#000000"><path d="m280-400 200-200 200 200H280Z"/></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-360 280-560h400L480-360Z"/></svg>
                                </button>
                            </div>
                        </th>
                        <th>
                            <div>
                                <span>Position</span>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 900" width="24px" fill="#000000"><path d="m280-400 200-200 200 200H280Z"/></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-360 280-560h400L480-360Z"/></svg>
                                </button>
                            </div>
                        </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    empList.map(item => {
                        return (
                            <tr key={item.employee_id}>
                                <td>{ item.first_name + ' ' + item.last_name}</td>
                                <td>{ item.email }</td>
                                <td>{ item.position }</td>
                                <td>
                                    <div className='action-btns'>
                                        <button style={{background: 'green', color: 'white'}} onClick={() => navigate('/viewemployee/' + item.employee_id)}>View</button>
                                        <button style={{background: 'red', color: 'white'}} onClick={() => deleteEmp(item.employee_id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        );
                        })
                    }
                </tbody>
                </table>
                ):(
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
}