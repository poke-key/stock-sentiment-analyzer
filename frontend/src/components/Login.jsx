import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, Bell, BookMarked, Settings, Link } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { useNavigate } from 'react-router';

const Login = () => {
	
	const [username, setUsername] = useState("");
  	const [password, setPassword] = useState("");
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			const response = await fetch("http://localhost:8000/api/login", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify({ username: username, password: password }),
			});
		
			if (!response.ok) {
			  throw new Error("Login failed");
			}
		
			const data = await response.json();
			sessionStorage.setItem("username", username)
			sessionStorage.setItem("session", data.session)
			navigate("/dashboard")
		  } 
		  catch (error) {
			console.error("Error:", error);
		  }
	};

	return (
	/* Card */
	<div className="w-screen h-screen bg-gray-100 p-4 flex justify-center items-center">

		{/* Login Layout */}
		<div className="grid grid-cols-1 gap-4 w-fit h-fit">

		{/* Login Contents */}
		<Card className="">
			<CardHeader>
				<CardTitle className="text-center">Login</CardTitle>
			</CardHeader>
			<CardContent>
				<form className='flex flex-col space-y-4 items-center'
					  onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Username"
						className="w-64 p-2 border rounded bg-gray-200"
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-64 p-2 border rounded bg-gray-200"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<input 
						type="submit"
						className='p-1 px-4 border rounded bg-violet-500 hover:bg-violet-600
						text-white'
						value='Login'
					/>
					<p className='text-xs'>Don't have an account?
						<a className='px-1' href='/register'>
							Register
						</a>
					</p>
				</form>
			</CardContent>
		</Card>
		</div>
	</div>
	);
}

export default Login;