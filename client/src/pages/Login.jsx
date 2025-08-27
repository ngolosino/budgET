import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            
            setLoading(false);

            const data = await res.json();

            if(res.ok){
                localStorage.setItem("token", data.token);
                setMessage(`Welcome back, ${data.user.name}`);
                console.log("ok");


                setTimeout(() => {
                    navigate("/dashboard"); // or whatever your protected route is
                }, 1500);

            }else{
                setMessage(data.message || "Login failed");
                console.log("Error");
            }
        } 
        catch (err) {
            setError("⚠️ Something went wrong. Please try again.");
            console.error(err);
            setLoading(false);
        }  
    };

    return (
    <div className="flex h-screen w-screen">
        {/* Left Side */}
        <div className="flex items-center justify-center w-1/2 bg-green-700">
            <div className="text-center">
                <h1 className="text-6xl font-extrabold text-white">.budgET</h1>
                <p className="text-white mt-2">Expense Tracker</p>
            </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center w-1/2 bg-gray-50">
            <form
            onSubmit={handleLogin}
            className="bg-gray-50 p-8 rounded-lg shadow-md w-96"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
                    Log In
                </h2>

                <div className="flex justify-between mt-3 text-sm text-gray-600">
                    Email
                </div>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
                    required
                />

                <div className="flex justify-between mt-3 text-sm text-gray-600">
                    Password
                </div>
                
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
                    required
                />

                {/* <button
                    type="submit"
                    className="w-full bg-green-700 text-white p-2 rounded hover:bg-green-800"
                >
                    Log In
                </button> */}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className="flex justify-between mt-3 text-sm text-gray-600">
                    <a href="#" className="hover:underline">
                    Forgot password?
                    </a>
                </div>

                <div className="mt-6 text-center text-sm text-black">
                    No account yet?{" "}
                    <Link to="/register" className="text-green-700 font-semibold hover:underline">
                    Register
                    </Link>
                </div>

                {message && <p className="text-green-600 font-medium mt-2">{message}</p>}
                {error && <p className="text-red-600 font-medium mt-2">{error}</p>}
            </form>
        </div>
    </div>

  );
}

export default Login
