import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
	return (
		<div className="my-72">
			<h2 className="font-bold text-4xl">404</h2>
			<h2 className="font-semibold text-2xl">UH OH! You're lost.</h2>
			<p className="text-lg mb-10">
				The page you are looking for does not exist. How you got here is a
				mystery. <br />
				But you can click the button below to go back to the home page
			</p>
			<Link
				to="/"
				className="w-full px-8 py-3 font-semibold rounded-md bg-black border-white text-white"
			>
				Go back to Home
			</Link>
		</div>
	);
};

export default Error;
