import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import ChatWindow from "./components/app/ChatWindow";
import ChatPlaceHolder from "./components/app/ChatPlaceholder";

function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <ChatPlaceHolder />
                },
                {
                    path: "/m/:id",
                    element: <ChatWindow />
                }
            ]
        },
        {
            path: "/auth",
            children: [
                {
                    path: "signup",
                    element: <Signup />
                },
                {
                    path: "login",
                    element: <Login />
                },
                {
                    path: "logout",
                    element: <Logout />
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default Router;
