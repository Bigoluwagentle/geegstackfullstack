import manImg from "../assets/images/man.png";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";
const HomePage = () => {
    return (
        <>
        <Header/>
        <main class="home">
            <section class="flex">
                <div>
                    <p>SHOP ALL YOUR PRODUCTS</p>
                    <p class="big">At the Best Prices</p>
                    <p>Enjoy up to 30% discount when you buy up to <u>5 products</u> as a Geegstacker!</p>

                    <Link to="/products" class="explore-btn">Explore &gt;&gt;</Link>
                </div>
                <img src={manImg} alt="manimg"/>
            </section>
        </main>
        <Footer/>
        </>
    )
}

export default HomePage;