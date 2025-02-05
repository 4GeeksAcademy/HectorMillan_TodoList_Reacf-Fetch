import React from "react";
import { ExampleFetch } from "./ExampleFetcj";
import { ExampleFechComplex } from "./ExampleFechComplex";
import { TodoListFetch } from "./TodoListFetch.jsx";
//include images into your bundle


//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<h1 className="text-center mt-5"></h1>
			<p>
			<TodoListFetch/>
			</p>
			
 	</div>
	);
};

export default Home;
