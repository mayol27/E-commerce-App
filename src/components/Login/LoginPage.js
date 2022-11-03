import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

export const LoginPage = () => {
	const { setAuth } = useContext(AuthContext);
	const emailRef = useRef();
	const errRef = useRef();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		emailRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg("");
	}, [email, password]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("/basket/login", {
				headers: { "Content-Type": "application/json" },
				data: JSON.stringify({
					email,
					password,
				}),
				withCredentials: true,
			});
			console.log(JSON.stringify(response?.data));
			setAuth({ email, password });
			setEmail("");
			setPassword("");
			setSuccess(true);
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 400) {
				setErrMsg("Missing Username or Password");
			} else if (err.response?.status === 401) {
				setErrMsg("Unauthorized");
			} else {
				setErrMsg("Login Failed");
			}
			errRef.current.focus();
		}
	};
	return (
		<>
			{success ? (
				<section className="my-96 text-4xl font-bold">
					<h1>You are logged in!</h1>
				</section>
			) : (
				<div className="mx-auto flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 my-36">
					<p
						ref={errRef}
						className={errMsg ? "errmsg" : "offscreen"}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<div className="mb-8 text-center">
						<h1 className="my-3 text-4xl font-bold">Sign in</h1>
						<p className="text-sm">Sign in to access your account</p>
					</div>
					<form
						onSubmit={handleSubmit}
						className="space-y-12 ng-untouched ng-pristine ng-valid"
					>
						<div className="space-y-4">
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm mr-60 pr-24"
								>
									Email
								</label>
								<input
									type="email"
									id="email"
									placeholder="leroy@gmail.com"
									ref={emailRef}
									autoComplete="off"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
									required
									className="w-full px-3 py-2 border rounded-md "
								/>
							</div>
							<div>
								<div className="flex justify-between mb-2">
									<label htmlFor="password" className="text-sm">
										Password
									</label>
								</div>
								<input
									type="password"
									id="password"
									placeholder="**********"
									onChange={(e) => setPassword(e.target.value)}
									value={password}
									required
									className="w-full px-3 py-2 border rounded-md "
								/>
							</div>
						</div>
						<div className="space-y-2">
							<div>
								<button className="w-full px-8 py-3 border   font-semibold rounded-md bg-black border-white text-white">
									Sign in
								</button>
							</div>
							<p className="px-6 text-sm text-center">
								Don't have an account yet?
								<Link
									rel="noopener noreferrer"
									to="/register"
									className="hover:underline text-red-600 pl-1 font-semibold"
								>
									Sign up
								</Link>
								.
							</p>
						</div>
					</form>
				</div>
			)}
		</>
	);
};

export default LoginPage;
