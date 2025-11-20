import Footer from "../component/Footer";
import Header from "../component/Header";
import Toast from "../component/Toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [form, setForm] = useState({email: "", password: ""});
    const inputChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const navigate = useNavigate();
    
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = JSON.stringify(form);

        fetch("https://geegstackecommerce.onrender.com/admin/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: formData
        })
        .then(res => res.json())
        .then(response => {
            if (response.type === "error") {
                return Toast.fire({icon: "error", title: response.message})
            }
            console.log(response.token, "admin token")
            window.sessionStorage.setItem("admintk", response.token);
            Toast.fire({icon: "success", title: response.message})
            navigate("/")
        })
        .catch((err) => {
            console.log(err)
            return Toast.fire({icon: "error", title: "Network error"})
        })
    }

    return (
        <>
            <Header/>
            <main class="product-details">
                <h2>Admin Login</h2>
                <p className="error"></p>
                <div className="form-container">
                    <form onSubmit={submitHandler} method="post">
                        <div>
                            <label for="email">
                                <p>Email</p>
                            </label>
                            <input type="email" name="email" onChange={inputChange} value={form.email}/>
                        </div>
                        <div>
                            <label for="password">
                                <p>Password</p>
                            </label>
                            <input type="password" name="password" onChange={inputChange} value={form.password}/>
                        </div>
                        <input type="submit" value="Login"/>
                    </form>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default AdminLogin;
