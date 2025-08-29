import { Link, Outlet, useNavigate } from "react-router-dom";



const DashboardLayout = () => {
  
    const navigate = useNavigate();
  
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
    <div className="flex h-screen">
        
        <aside className="w-64 bg-green-700 text-white flex flex-col">

        </aside>

    </div>
  )
}

export default DashboardLayout
