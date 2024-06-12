import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UsersList from "./components/UsersList";

function App() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            return navigate("/auth/login");
        }
    });

    return (
        <>
            <UsersList token={token!} />
            <Outlet />
        </>
    );
}

export default App;
