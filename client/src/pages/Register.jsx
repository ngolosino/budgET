import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if(password !== confirmPassword){
            setError("⚠️ Passwords do not match.");
            return;
        }

        setLoading(true);

        try{
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            setLoading(false);

            const data = await res.json();

            if(res.ok){
                localStorage.setItem("token", data.token);
                setMessage(`Successfully registered`);
                console.log("ok");

                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }else{
                setMessage(data.message || "Registration Failed");
                console.log("Error");
            }

        }
        catch (err){
            setError("⚠️ Something went wrong. Please try again.");
            console.log(err);
            setLoading(false);
        }
    };


  return (
    <div className='flex w-screen h-screen'>

        {/* Left Side */}
        <div className="flex items-center justify-center w-1/2 bg-gray-50">
            <form 
            onSubmit={handleRegister}
            className="bg-gray-50 p-8 rounded-lg shadow-md w-96"
            >   
                <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
                    Register
                </h2>

                <div className="flex justify-between mt-3 text-sm text-gray-600">
                    Email
                </div>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
                    required
                />

                <div className="flex justify-between mt-3 text-sm text-gray-600">
                    Name
                </div>

                <input
                    type="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
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
                    className="w-full p-2 mb-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
                    required
                />

                <div className="flex justify-between mt-3 text-sm text-gray-600">
                    Confirm Password
                </div>
                
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 mb-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 mt-4 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    >
                    {loading ? "Registering..." : "Register"}
                </button>

                <div className="flex justify-between mt-3 text-sm text-gray-600">
                    <Link to="/login" className="hover:underline">
                    Already have an account?
                    </Link>
                </div>


                {message && <p className="text-green-600 font-medium mt-2">{message}</p>}
                {error && <p className="text-red-600 font-medium mt-2">{error}</p>}

            </form>
        </div>


        {/* Right Side */}
        <div className="flex items-center justify-center w-1/2 bg-green-700">
            <div className="text-center">
                <h1 className="text-6xl font-extrabold text-white">.budgET</h1>
                <p className="text-white mt-2">Expense Tracker</p>
            </div>
        </div> 
    </div>
  )
}

export default Register
