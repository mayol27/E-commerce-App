import React, { useState } from "react";
import { Link } from "react-router-dom";

const HeaderPage = () => {
	const [state, setState] = useState(false);
	return (
		<header aria-label="Site Header" className="border-b border-white">
			<div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8">
				<div className="flex items-center">
					<Link to="/" class="block text-black">
						<span class="sr-only">Home</span>
						<svg
							class="h-12"
							viewBox="0 0 192.756 192.756"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M0 0h192.756v192.756H0V0z" />
							<path d="M0 0h192.756v192.756H0V0z" />
							<path
								d="M34.175 107.36c-1.488 0-2.653 1.041-2.653 2.56 0 1.52 1.171 2.555 2.653 2.555 1.481 0 2.653-1.042 2.653-2.555 0-1.519-1.166-2.56-2.653-2.56zm0 4.383c-1.061 0-1.848-.775-1.848-1.823 0-1.047.781-1.828 1.848-1.828 1.054 0 1.847.793 1.847 1.828 0 1.029-.8 1.823-1.847 1.823zM59.99 98.406H47.075l1.468-22.448-8.387 22.448H28.163l19.029-50.739h12.761L58.48 70.423l8.546-22.756H79.02L59.99 98.406zM61.548 98.406l19.028-50.739h11.993L73.541 98.406H61.548z"
								fill="currentColor"
							/>
							<path
								d="M26.78 80.917c-16.759 19.681-32.568 45.868-18.604 57.927 13.531 11.686 30.444 4.767 41.976.154s138.995-59.965 138.995-59.965c1.23-.615 1-1.384-.538-1-.62.155-138.764 37.593-138.764 37.593-17.53 4.921-37.518-5.804-23.065-34.709z"
								fill="currentColor"
							/>
							<path
								d="M34.627 110.1c.372-.018.663-.21.663-.725 0-.664-.434-.831-1.159-.831h-1.042v2.753h.695v-1.172h.117l.633 1.172h.799l-.706-1.197zm-.446-.446h-.396v-.639h.334c.205 0 .44.024.44.291 0 .286-.136.348-.378.348zM154.733 47.512c-1.488 0-2.653 1.042-2.653 2.56 0 1.519 1.172 2.554 2.653 2.554s2.653-1.042 2.653-2.554c.001-1.518-1.164-2.56-2.653-2.56zm0 4.384c-1.061 0-1.848-.775-1.848-1.823 0-1.047.781-1.828 1.848-1.828 1.054 0 1.848.793 1.848 1.828 0 1.029-.8 1.823-1.848 1.823z"
								fill="currentColor"
							/>
							<path
								d="M155.186 50.252c.372-.018.664-.21.664-.725 0-.664-.435-.831-1.159-.831h-1.042v2.752h.694v-1.171h.118l.632 1.171h.8l-.707-1.196zm-.447-.446h-.396v-.639h.335c.204 0 .44.025.44.292 0 .285-.137.347-.379.347zM146.831 56.124l3.223-8.457H113.46l-12.565 15.222 5.801-15.222H94.549L75.673 98.406h11.993l8.059-21.218.552 21.218 36.799-.08 3.503-9.76h-13.991l4.597-12.3h11.531l3.548-9.456h-11.531l3.953-10.686h12.145zm-38.656 38.899l-.769-26.445 18.133-19.909-17.364 46.354z"
								fill="currentColor"
							/>
						</svg>
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-end">
					<nav
						aria-label="Site Nav"
						className="hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-gray-500"
					>
						<Link
							to="/shop"
							className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-black"
						>
							Shop
						</Link>
					</nav>
					<div className="ml-8 flex items-center">
						<div className="flex items-center divide-x divide-gray-100 border-x border-gray-100">
							<span>
								<a
									href="/cart"
									className="block border-b-4 border-transparent px-6 py-5 hover:border-black"
								>
									<svg
										className="h-4 w-4 inline"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
										/>
									</svg>
									<span className="sr-only">Cart</span>
									<span className="text-white font-bold text-xs absolute bg-black rounded-sm px-1">
										0
									</span>
								</a>
							</span>
							<span>
								<Link
									to="/login"
									className="block border-b-4 border-transparent p-6 hover:border-black"
								>
									<svg
										className="h-4 w-4"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
									<span className="sr-only"> Login </span>
								</Link>
							</span>
							<button
								type="button"
								className="p-2 lg:hidden"
								onClick={() => setState(!state)}
							>
								{state ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
								) : (
									<svg
										className="h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								)}
							</button>
							<div
								className={`flex-1 justify-self-center pb-3  md:pb-0 ${
									state ? "block" : "hidden"
								}`}
							>
								<ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-x-reverse md:space-y-0 text-xs font-bold uppercase lg:tracking-wide text-gray-500 xs:pt-4 md:pt-1 ">
									<Link
										to="/shop"
										className="lg:hidden inline-block h-16 mx-3 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-black"
									>
										Shop
									</Link>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default HeaderPage;
