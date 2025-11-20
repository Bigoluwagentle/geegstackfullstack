import Footer from "../component/Footer"
import Header from "../component/Header";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../component/Toast"; 

const ProductsPage = () => {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/products")
        .then(res => res.json())
        .then(response => {
            if (response.type === "error") {
                return Toast.fire({icon: "error", title: response.message})
                .then(() => navigate("/"))
            }
            setProducts(response.products);
        })
        .catch(err => {
            Toast.fire({icon: "error", title: "Network error"})
            .then(() => navigate("/"))
        })
    }, [])
    return (
        <>
          <Header/>  
                <main class="products">
                    {
                        products.map((product) => {
                            return (
                              <article class="product">
                                <img src={"http://localhost:8080/" + product?.imageurl[0]}  alt="productimg"/>
                                <h3>{product.name}</h3>
                                <div class="flex">
                                    <p class="price">{product.price.toLocaleString()}</p>
                                    <p class="category">{product.category}</p>
                                </div>
                                <Link to={"/products/" + product._id}>View product</Link>
                            </article>  
                            )
                        })
                    }
                    
                </main>
            <Footer/>
        </>
    )
}

export default ProductsPage;