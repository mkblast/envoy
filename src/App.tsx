import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UsersList from "./components/app/UsersList";
import Styles from "./App.module.css";
import SideBar from "./components/app/SideBar";

function App() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            return navigate("/auth/login");
        }
    });

    return (
        <div className={Styles.container}>
            <SideBar />
            <UsersList token={token!} />
            <Outlet />
        </div>
    );
}

export default App;
