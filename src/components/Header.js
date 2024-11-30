import './css/Header.css';
import {useNavigate} from "react-router-dom";

export default function Header() {



    const navigate = useNavigate();
    return (
        <header>
            <div className='left'>
                <h2>EMP 2.0</h2>
            </div>
            <div className='right'>
                <button onClick={() => navigate('/login')}>Logout</button>
            </div>
        </header>
    );
}