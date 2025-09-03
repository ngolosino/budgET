import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if(!storedToken || !storedUser) {
            navigate("/");
            return;
        }

        setUser(JSON.parse(storedUser))
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
    <div className="flex h-screen w-screen">
        
        <aside className="w-64 bg-green-700 text-white flex flex-col">
            <div className="p-6">
                <div className="w-20 h-20 rounded-full bg-white text-green-700 flex items-center justify-center text-xl font-bold mx-auto">
                    👤
                </div>
                <p className="mt-2 text-center font-semibold">{user ? user.name : "Loading..."}</p>
            </div>

            <nav className="flex-1 px-4">
                <ul className="space-y-4">
                    <NavLink
                        to="expenses"
                        className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg transition-colors text-white ${
                            isActive
                            ? "bg-white text-green-700 font-semibold"
                            : "hover:bg-green-600"}`}>
                        Expenses
                    </NavLink>
                    <NavLink
                        to="category"
                        className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg transition-colors text-white ${
                            isActive
                            ? "bg-white text-green-700 font-semibold"
                            : "hover:bg-green-600"}`}>
                        Category
                    </NavLink>
                    <NavLink
                        to="analytics"
                        className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg transition-colors text-white ${
                            isActive
                            ? "bg-white text-green-700 font-semibold"
                            : "hover:bg-green-600"}`}>
                        Analytics and Report
                    </NavLink>
                    <NavLink
                        to="settings"
                        className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg transition-colors text-white ${
                            isActive
                            ? "bg-white text-green-700 font-semibold"
                            : "hover:bg-green-600"}`}>
                        Settings & Preferences
                    </NavLink>
                </ul>
            </nav>

            <button
            onClick={handleLogout}
            className="p-4 bg-red-600 text-white hover:bg-red-700"
            >
                Log Out
            </button>
        </aside>

        {/* Main content area */}
        <main className="flex-1 bg-gray-100 p-6">
            {/* Outlet is where nested routes show up */}
            <Outlet />
        </main>

    </div>
  )
}

export default DashboardLayout
