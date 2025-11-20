import Footer from "../component/Footer";
import Header from "../component/Header";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../component/Toast";

const EditProductPage = () => {
    const [form, setForm] = useState({name: "", price: 0, category: "", description: "", imageurl: ""});
    const params = useParams();

    const inputChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const adminToken = window.sessionStorage.getItem("admintk");
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminToken) {
            Toast.fire({icon: "error", title: "You need to be logged in.."})
            .then(() => navigate("/admin/login"))
        }
        fetch("https://geegstackecommerce.onrender.com/products/" + params.id)
        .then(res => res.json())
        .then(response => {
            if(response.type === "error") {
             Toast.fire({icon: "error", title: response.message})
             return navigate("/");
            }
            console.log(response.product)
            setForm({...response.product, images: response.product.imageurl[0]});
        })
        .catch(err => {
            console.log(err);
            
            Toast.fire({icon: "error", title: "Network error"})
            return navigate("/");
        })
        
    }, [navigate, params.id, adminToken])
    
    const submitHandler = (e) => {
        e.preventDefault();
        let formData = {...form, images: [form.imageurl], price: parseFloat(form.price)};
        formData = JSON.stringify(formData);

        fetch("https://geegstackecommerce.onrender.com/products/" + params.id, {
            method: "PUT",
            headers: {"Content-Type": "application/json", token: "Bearer " + adminToken},
            body: formData
        })
        .then(res=> res.json())
        .then(response => {
            if(response.type === "error") {
                return Toast.fire({icon: "error", title: response.message})
            }
            Toast.fire({icon: "success", title:response.message})
            .then(() => navigate("/products/" + params.id)); 
        })
        .catch(err => {
            console.log(err);
            return Toast.fire({icon: "error", title: "Network error"});
        })
    }

    return (
        <>
        <Header/>
        <main className="product-details">
         <h2>Edit Product</h2>
         <p className="error"></p>
         <div className="form-container">
            <form method="POST" onSubmit={submitHandler}>
                <div>
                    <label for="name">
                        <p>Product Name</p>
                    </label>
                    <input type="text" name="name" id="" onChange={inputChange} value={form.name} />
                </div>
                <div>
                    <label for="price">
                        <p>Product Price</p>
                    </label>
                    <input type="number" name="price" id="" onChange={inputChange} value={form.price} />
                </div>
                <div>
                    <label for="description">
                        <p>Product Description</p>
                    </label>
                    <textarea type="text" onChange={inputChange} id="" cols="30" rows="10" value={form.description}></textarea>
                </div>
                <div>
                    <label for="image">
                        <p>Product Image URL</p>
                    </label>
                    <input type="string" name="images" id="" onChange={inputChange} value={form.images && form.images} />
                </div>
                <div>
                    <label for="category">
                        <p>Product Category</p>
                    </label>
                    <select name="category" onChange={inputChange} id="" value={form.category}>
                        <option value="Accessories"> Accessories </option>
                        <option value="Gadget"> Gadget </option>
                        <option value="Grocery"> Grocery </option>
                    </select>
                </div>
                <input type="submit" value="Edit Product" />
            </form>
         </div>
        </main>
        <Footer/>
        </>
        
    )
}

export default EditProductPage;