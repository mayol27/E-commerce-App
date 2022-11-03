import React from "react";

const HomePage = () => {
	return (
		<section className="relative bg-[url(https://images.unsplash.com/photo-1608541737042-87a12275d313?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1461&q=80)] bg-cover bg-center bg-no-repeat">
			<div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25" />
			<div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
				<div className="max-w-xl text-center sm:text-left">
					<h1 className="text-3xl font-extrabold sm:text-5xl">
						Yesterday you said tomorrow.
						<strong className="block font-extrabold "> JUST DO IT.</strong>
					</h1>
					<p className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed text-gray-600">
						Greatness is not born, it is made.
					</p>
					<div className="mt-8 flex flex-wrap gap-4 text-center">
						<a
							href="#"
							className="block w-full rounded bg-gray-500 px-12 py-3 text-sm font-medium text-white shadow hover:bg-black focus:outline-none focus:ring active:bg-gray-500 sm:w-auto"
						>
							Get Started
						</a>
						<a
							href="#"
							className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-gray-600 shadow hover:text-black focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
						>
							Learn More
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HomePage;
