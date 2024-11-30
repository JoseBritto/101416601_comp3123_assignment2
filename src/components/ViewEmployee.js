import './css/viewemployee.css'
import { useParams } from "react-router";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function ViewEmployee({axiosInstance}) {
    
    let { emp_id } = useParams();

    const navigate = useNavigate();

    let [employee, setEmployee] = useState(null);

    const fetchEmp = () => {
        axiosInstance
        .get('/emp/employees/'+emp_id)
        .then(function (response) {
            if(response.status === 200) {
                console.log(response.data);
                setEmployee(response.data);
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        fetchEmp();
    }, []);

    /*
    const employee = {
        "employee_id": "670c8a34799b6c18c870ceb7",
        "first_name": emp_id,
        "last_name": "Johnson",
        "email": "doe.johnson@example.com",
        "position": "Manager",
        "salary": 85000,
        "date_of_joining": "2023-08-10T00:00:00.000Z",
        "department": "Sales"
    };*/

    return (
        <>
            {employee ? (

                <div className="view-emp">
                    <h2 className="text-center mb-4">{employee.first_name} {employee.last_name}</h2>
                    <div className="card w-50 mx-auto">
                        <div className="card-body">
                            <p className="card-text">
                                <strong>Email:</strong> {employee.email}
                            </p>
                            <p className="card-text">
                                <strong>Position:</strong> {employee.position}
                            </p>
                            <p className="card-text">
                                <strong>Salary:</strong> ${employee.salary}
                            </p>
                            <p className="card-text">
                                <strong>Department:</strong> {employee.department}
                            </p>
                            <p className="card-text">
                                <strong>Date of Joining:</strong> {new Date(employee.date_of_joining).toLocaleDateString()}
                            </p>
                            <button className="btn btn-secondary" onClick={() => navigate('/employeelist')}>
                                Back to Employee List
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p style={{marginTop: '50%', textAlign: 'center'}}>Loading...</p>
            )}

        </>
    );
}