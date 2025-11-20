import Footer from "../component/Footer";
import Header from "../component/Header";
import Toast from "../component/Toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyAdmin = () => {
    const [code, setCode] = useState("");

    const navigate = useNavigate();
    
    const submitHandler = (e) => {
        e.preventDefault();
        const email = window.sessionStorage.getItem("usermail");
        const formData = JSON.stringify({authCode: code, email: email});

        fetch("https://geegstackecommerce.onrender.com/admin/verify", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: formData
        })
        .then(res => res.json())
        .then(response => {
            if (response.type === "error") {
                return Toast.fire({icon: "error", title: response.message})
            }
            
            Toast.fire({icon: "success", title: response.message})
            navigate("/admin/login")
        })
        .catch((err) => {
            return Toast.fire({icon: "error", title: "Network error"})
        })
    }

    return (
        <>
            <Header/>
            <main class="product-details">
                <h2>Verify Email</h2>
                <p>Enter the code sent to your email address to proceed</p>
                <div className="form-container">
                    <form onSubmit={submitHandler} method="post">
                        
                        <div>
                            <label htmlFor="code">
                                <p>Verification Code</p>
                            </label>
                            <input type="text" name="code" onChange={(e) => setCode(e.target.value)} />
                        </div>
                        <input type="submit" value="Verify Account"/>
                    </form>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default VerifyAdmin;
