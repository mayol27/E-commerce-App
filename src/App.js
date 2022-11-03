import "./App.css";
import FooterPage from "./Pages/Footer/FooterPage";
import HeaderPage from "./components/Header/HeaderPage";
import HomePage from "./Pages/Home/HomePage";
import Error404 from "./Pages/NotFoundPage/Error404";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShopPage from "./Pages/Products/ProductPage";
import ShoppingCart from "./components/Cart/ShoppingCart";
import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Register/RegisterPage";
import SingleProduct from "./Pages/Products/SingleProduct";

function App() {
	return (
		<div className="App">
			<Router>
				<HeaderPage />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/shop" element={<ShopPage />} />
					<Route path="/singleproduct" element={<SingleProduct />} />
					<Route path="/cart" element={<ShoppingCart />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/*" element={<Error404 />} />
				</Routes>
				<FooterPage />
			</Router>
		</div>
	);
}

export default App;
