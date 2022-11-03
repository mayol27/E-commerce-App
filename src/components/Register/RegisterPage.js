import React, { useRef, useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./RegisterPage.css";
import { Link } from "react-router-dom";
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";

//Username Requirement (Allowed small and big letter a-z and digits and hypens,underscored, 4 to 24 characters.)
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const FIRST_NAME = /^[a-zA-Z][a-zA-Z]{3,23}$/;
const LAST_NAME = /^[a-zA-Z][a-zA-Z]{3,23}$/;
const EMAIL_REGEX = /^[\w-]{5,30}@.*$/;

//Password Requirement (Must be small and big letter a-z and digits and special character allowed, 8 to 24 characters.)
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z](?=.*[0-9]))(?=.*[!@#$%]).{5,23}$/;

const RegisterPage = () => {
	//use to track the user input when the component loads
	const userRef = useRef();
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const emailRef = useRef();
	//use to track the user error that can announce by screen reader for the accessibility
	const errRef = useRef();

	//use to track current state and update state
	const [user, setUser] = useState("");
	//use to track current state and update state validation
	const [validName, setValidName] = useState(false);
	//use to track whether to focus on input or not
	const [userFocus, setUserFocus] = useState(false);

	//use to track current state and update state
	const [firstName, setFirstName] = useState("");
	//use to track current state and update state validation
	const [validFirstName, setValidFirstName] = useState(false);
	//use to track whether to focus on input or not
	const [firstNameFocus, setFirstNameFocus] = useState(false);

	//use to track current state and update state
	const [lastName, setLastName] = useState("");
	//use to track current state and update state validation
	const [validLastName, setValidLastName] = useState(false);
	//use to track whether to focus on input or not
	const [lastNameFocus, setLastNameFocus] = useState(false);

	//use to track current state and update state
	const [email, setEmail] = useState("");
	//use to track current state and update state validation
	const [validEmail, setValidEmail] = useState(false);
	//use to track whether to focus on input or not
	const [emailFocus, setEmailFocus] = useState(false);

	//use to track current state and update state
	const [pwd, setPwd] = useState("");
	//use to track current state and update state validation
	const [validPwd, setValidPwd] = useState(false);
	//use to track whether to focus on input or not
	const [pwdFocus, setPwdFocus] = useState(false);

	//use to track current state and update state
	const [matchPwd, setMatchPwd] = useState("");
	//use to track current state and update state validation
	const [validMatch, setValidMatch] = useState(false);
	//use to track whether to focus on input or not
	const [matchFocus, setMatchFocus] = useState(false);

	//use to track current state and update state and to verify captcha
	const [verified, setVerified] = useState(false);
	function onChange(value) {
		console.log("Captcha value:", value);
		setVerified(true);
	}

	//use to track current state and update state if it is error exist
	const [errMsg, setErrMsg] = useState("");
	//use to track current state and update state if it is succesfully submit the registration or not
	const [success, setSuccess] = useState(false);

	//setting to focus on inputs when the component load
	useEffect(() => {
		userRef.current.focus();
		emailRef.current.focus();
		firstNameRef.current.focus();
		lastNameRef.current.focus();
	}, []);

	//this is where I validate the username,firstname,lastname,email
	useEffect(() => {
		setValidName(USER_REGEX.test(user));
		setValidFirstName(FIRST_NAME.test(firstName));
		setValidLastName(LAST_NAME.test(lastName));
		setValidEmail(EMAIL_REGEX.test(email));
	}, [user, firstName, lastName, email]);

	//this is where I validate the password and if it is match with the password confirmation and use to check if changes happen
	useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	//it is for the error message if the user change username,password and password confirmation it will appear the error message
	useEffect(() => {
		setErrMsg("");
	}, [user, pwd, matchPwd, firstName, lastName, email]);

	//Submit async function for th submit event response
	const handleSubmit = async (e) => {
		e.preventDefault();
		// if button enabled with JS hack
		const v1 = EMAIL_REGEX.test(email);
		const v2 = PWD_REGEX.test(pwd);
		const v3 = USER_REGEX.test(user);
		const v4 = FIRST_NAME.test(firstName);
		const v5 = LAST_NAME.test(lastName);
		if (!v1 || !v2 || !v3 || !v4 || !v5) {
			setErrMsg("Invalid Entry");
			return;
		}
		try {
			const response = await axios.post(
				"/basket/register",

				{
					headers: { "Content-Type": "application/json" },
					data: JSON.stringify({
						username: user,
						password: pwd,
						firstname: firstName,
						lastname: lastName,
						email,
					}),
				}
			);
			console.log(response);
			console.log(JSON.stringify(response));
			setSuccess(true);
			//clear input fields
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 409) {
				setErrMsg("Username Taken");
			} else {
				setErrMsg("Registration Failed");
			}
			errRef.currentfocus();
		}
	};
	return (
		<>
			{success ? (
				<section className="my-80 text-4xl font-bold">
					<h1>Success!</h1>
					<Link to="/login" className="hover:underline mt-10 font-semibold">
						Sign In
					</Link>
				</section>
			) : (
				<section className="regsec rounded-md sm:p-10">
					{/* if the error message exist and error message appear otherwise it will appear offscreen*/}
					<p
						ref={errRef}
						className={errMsg ? "errmsg" : "offscreen"}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<div className="mb-8 text-center">
						<h1 className="my-3 text-4xl font-bold">Register</h1>
						<p className="text-sm">Register Here, To create your account.</p>
					</div>
					<form className="regform" onSubmit={handleSubmit}>
						<label htmlFor="firstname" className="block my-2 text-sm ">
							Firstname
							{/* if firstname is valid it will show green check otherwise it will hide */}
							<span className={validFirstName ? "valid" : "hide"}>
								<FontAwesomeIcon icon={faCheck} />
							</span>
							{/* if firstname is invalid it will show red cross otherwise it will hide */}
							<span
								className={validFirstName || !firstName ? "hide" : "invalid"}
							>
								<FontAwesomeIcon icon={faTimes} />
							</span>
						</label>
						<input
							type="text"
							id="firstname"
							placeholder="leroy"
							ref={firstNameRef}
							autoComplete="off"
							onChange={(e) => setFirstName(e.target.value)}
							value={firstName}
							required
							aria-invalid={validFirstName ? "false" : "true"}
							aria-describedby="fidnote"
							onFocus={() => setFirstNameFocus(true)}
							onBlur={() => setFirstNameFocus(false)}
							className="w-full px-3 py-2 border rounded-md"
						/>
						{/* if firstname,firstnamefocus and not valid firstname it will show instructions otherwise it will offscreen */}
						<p
							id="fidnote"
							className={
								firstNameFocus && firstName && !validFirstName
									? "instructions"
									: "offscreen"
							}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							4 to 24 characters.
							<br />
							Only Letters Allowed.
							<br />
							Numbers, underscores, hyphens not allowed.
						</p>
						<label htmlFor="lastname" className="block my-2 text-sm ">
							Lastname
							{/* if lastname is valid it will show green check otherwise it will hide */}
							<span className={validLastName ? "valid" : "hide"}>
								<FontAwesomeIcon icon={faCheck} />
							</span>
							{/* if firstname is invalid it will show red cross otherwise it will hide */}
							<span className={validLastName || !lastName ? "hide" : "invalid"}>
								<FontAwesomeIcon icon={faTimes} />
							</span>
						</label>
						<input
							type="text"
							id="lastname"
							placeholder="brrbrr"
							ref={lastNameRef}
							autoComplete="off"
							onChange={(e) => setLastName(e.target.value)}
							value={lastName}
							required
							aria-invalid={validLastName ? "false" : "true"}
							aria-describedby="lidnote"
							onFocus={() => setLastNameFocus(true)}
							onBlur={() => setLastNameFocus(false)}
							className="w-full px-3 py-2 border rounded-md"
						/>
						{/* if lastname,lastnamefocus and not valid lastname it will show instructions otherwise it will offscreen */}
						<p
							id="lidnote"
							className={
								lastNameFocus && lastName && !validLastName
									? "instructions"
									: "offscreen"
							}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							4 to 24 characters.
							<br />
							Only Letters Allowed.
							<br />
							Numbers, underscores, hyphens not allowed.
						</p>
						<label htmlFor="username" className="block my-2 text-sm ">
							Username
							{/* if username is valid it will show green check otherwise it will hide */}
							<span className={validName ? "valid" : "hide"}>
								<FontAwesomeIcon icon={faCheck} />
							</span>
							{/* if username is invalid it will show red cross otherwise it will hide */}
							<span className={validName || !user ? "hide" : "invalid"}>
								<FontAwesomeIcon icon={faTimes} />
							</span>
						</label>
						<input
							type="text"
							id="username"
							placeholder="leroy214"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setUser(e.target.value)}
							value={user}
							required
							aria-invalid={validName ? "false" : "true"}
							aria-describedby="uidnote"
							onFocus={() => setUserFocus(true)}
							onBlur={() => setUserFocus(false)}
							className="w-full px-3 py-2 border rounded-md"
						/>
						{/* if username,usernamefocus and not valid username it will show instructions otherwise it will offscreen */}
						<p
							id="uidnote"
							className={
								userFocus && user && !validName ? "instructions" : "offscreen"
							}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							4 to 24 characters.
							<br />
							Must begin with a letter.
							<br />
							Letters, numbers, underscores, hyphens allowed.
						</p>
						<label htmlFor="email" className="block my-2 text-sm ">
							Email
							{/* if email is valid it will show green check otherwise it will hide */}
							<span className={validEmail ? "valid" : "hide"}>
								<FontAwesomeIcon icon={faCheck} />
							</span>
							{/* if email is invalid it will show red cross otherwise it will hide */}
							<span className={validEmail || !email ? "hide" : "invalid"}>
								<FontAwesomeIcon icon={faTimes} />
							</span>
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
							aria-invalid={validEmail ? "false" : "true"}
							aria-describedby="eidnote"
							onFocus={() => setEmailFocus(true)}
							onBlur={() => setEmailFocus(false)}
							className="w-full px-3 py-2 border rounded-md"
						/>
						{/* if email,emailfocus and not valid email it will show instructions otherwise it will offscreen */}
						<p
							id="eidnote"
							className={
								emailFocus && email && !validEmail
									? "instructions"
									: "offscreen"
							}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							6 to 31 characters.
							<br />
							Only Letters, Numbers, underscores, allowed.
						</p>
						<label htmlFor="password" className="block my-2 text-sm">
							Password
							{/* if password is valid it will show green check otherwise it will hide */}
							<FontAwesomeIcon
								icon={faCheck}
								className={validPwd ? "valid" : "hide"}
							/>
							{/* if password is invalid it will show red cross otherwise it will hide */}
							<FontAwesomeIcon
								icon={faTimes}
								className={validPwd || !pwd ? "hide" : "invalid"}
							/>
						</label>
						<input
							type="password"
							id="password"
							placeholder="**********"
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							required
							aria-invalid={validPwd ? "false" : "true"}
							aria-describedby="pwdnote"
							onFocus={() => setPwdFocus(true)}
							onBlur={() => setPwdFocus(false)}
							className="w-full px-3 py-2 border rounded-md"
						/>
						{/* if password,passwordfocus and not valid password it will show instructions otherwise it will offscreen */}
						<p
							id="pwdnote"
							className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							6 to 24 characters.
							<br />
							Must include uppercase and lowercase letters, a number and a
							special character.
							<br />
							Allowed special characters:
							<span aria-label="exclamation mark">!</span>
							<span aria-label="at symbol">@</span>
							<span aria-label="hashtag">#</span>
							<span aria-label="dollar sign">$</span>
							<span aria-label="percent">%</span>
						</p>
						<label htmlFor="confirm_pwd" className="block my-2 text-sm ">
							Password Confirmation
							{/* if password confirmation is valid it will show green check otherwise it will hide */}
							<FontAwesomeIcon
								icon={faCheck}
								className={validMatch && matchPwd ? "valid" : "hide"}
							/>
							{/* if password is invalid it will show red cross otherwise it will hide */}
							<FontAwesomeIcon
								icon={faTimes}
								className={validMatch || !matchPwd ? "hide" : "invalid"}
							/>
						</label>
						<input
							type="password"
							id="confirm_pwd"
							placeholder="**********"
							onChange={(e) => setMatchPwd(e.target.value)}
							value={matchPwd}
							required
							aria-invalid={validMatch ? "false" : "true"}
							aria-describedby="confirmnote"
							onFocus={() => setMatchFocus(true)}
							onBlur={() => setMatchFocus(false)}
							className="w-full px-3 py-2 border rounded-md"
						/>
						{/* if password confirmation,passconfifocus and not valid pass confi it will show instructions otherwise it will offscreen */}
						<p
							id="confirmnote"
							className={
								matchFocus && !validMatch ? "instructions" : "offscreen"
							}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							Must match the first password input field.
						</p>
						{/*google recaptcha*/}
						<ReCAPTCHA
							className="my-3 mx-auto"
							sitekey="6Lf7E8ciAAAAAHCKPdUh95ZWArj9L85sP2r1CvnK"
							onChange={onChange}
						/>

						{/* if valid username,email,firstname,password,emailpassword confirmation it will enabled the button otherwise it will disabled*/}
						<button
							disabled={
								!validName ||
								!validFirstName ||
								!validLastName ||
								!validEmail ||
								!validPwd ||
								!validMatch ||
								!verified
									? true
									: false
							}
							className="w-full px-8 py-3 font-semibold rounded-md bg-black border-white text-white mt-1"
						>
							Sign Up
						</button>
					</form>
					<p className="px-6 text-sm text-center mt-3">
						Already Registered?
						<span className="line">
							<Link
								rel="noopener noreferrer"
								to="/login"
								className="hover:underline pl-1 font-semibold"
							>
								Sign In
							</Link>
						</span>
					</p>
				</section>
			)}
		</>
	);
};

export default RegisterPage;
