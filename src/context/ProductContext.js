import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "../api/axios";
import reducer from "../reducer/ProductReducer";

const AppContext = createContext();

const API =
	"https://getpantry.cloud/apiv1/pantry/865e0167-a2ec-42a2-ba4b-76376112c695/basket/products";

const initialState = {
	isLoading: false,
	isError: false,
	products: [],
};

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const getProducts = async (url) => {
		dispatch({ type: "SET_LOADING" });
		try {
			const res = await axios.get(url);
			const products = await res.data;
			dispatch({ type: "SET_API_DATA", payload: products });
			console.log(products, "asdasdasdadas");
		} catch (error) {
			dispatch({ type: "API_ERROR" });
		}
	};

	useEffect(() => {
		getProducts(API);
	}, []);

	return (
		<AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
	);
};

// custom hooks
const useProductContext = () => {
	return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
