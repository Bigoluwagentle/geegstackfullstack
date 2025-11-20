
import { Link, useNavigate } from "react-router-dom";
import Toast from "./Toast";
const Header = () => {
    const adminToken = window.sessionStorage.getItem("admintk");
    const navigate = useNavigate();

    const logout = () => {
        window.sessionStorage.removeItem("admintk");
        Toast.fire({icon: "success", title: "Logged out"})
        navigate("/");
    }
    return (
        <header className="flex">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                </ul>
            </nav>

           
            <h3 class="title">Geegstack Store</h3>
            {
                adminToken ? 
                <button className="price" onClick={logout}>Logout</button>
                :
                <Link to="/admin/login">
                    <button className="price">Login</button>
                </Link>
            }
            
        </header>
    )
}

export default Header;