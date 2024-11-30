import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import './css/addemployee.css';

export default function AddEmployee ({ axiosInstance }) {
    
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        position: "",
        salary: 0,
        date_of_joining: "",
        department: "",
    });

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('saving..');

        setData({
            ...data,
            ['salary']: Number(data['salary'])
        });

        axiosInstance
            .post("/emp/employees", data)
            .then((res) => {
                console.log(res);
                if (res.status === 201) {
                    navigate("/employeelist");
                }
            })
            .catch((err) => console.log(err));
    };

    return  (
        <div className="addEmp">
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="first_name">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="last_name">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        name="last_name"
                        value={data.last_name}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="position" className="form-label">
                        Position
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="position"
                        name="position"
                        value={data.position}
                        onChange={handleChange}
                        placeholder="Enter position"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="salary" >
                        Salary
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="salary"
                        name="salary"
                        value={data.salary}
                        onChange={handleChange}
                        placeholder="Enter salary"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date_of_joining" className="form-label">
                        Date of Joining
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="date_of_joining"
                        name="date_of_joining"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="department" className="form-label">
                        Department
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="department"
                        name="department"
                        value={data.department}
                        onChange={handleChange}
                        placeholder="Enter department"
                        required
                    />
                </div>
                <div className="buttons">
                    <button style={{background: "green", color: 'white'}} type="submit" > Save </button>
                    <button style={{background: "red", color: 'white'}} type="button" onClick={() => navigate('/employeelist')}>
                        Cancel
                    </button>
                </div>
                <div className="mt-4"></div>
            </form>
        </div>
    );
}