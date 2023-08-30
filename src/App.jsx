import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/layout/Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ErrorBoundary from "./pages/ErrorBoundary";

import { login } from "./API/action";
import { checkAuthLoader } from "./utils/auth";
import axios from "axios";
import Orders from "./pages/Orders";
import ListOfProduct from "./pages/ListOfProduct";
import LiveChat from "./pages/LiveChat";
import ProductPage from "./pages/ProductPage";
import EditProductPage from "./pages/EditProductPage";

axios.defaults.baseURL = "https://server-boutique-tau.vercel.app/api";
// don't use it because upload file in backend undefined
// axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
    {
        path: "/",
        id: "root",
        element: <Root />,
        errorElement: <ErrorBoundary />,
        loader: checkAuthLoader,
        children: [
            { index: true, element: <Home />, loader: checkAuthLoader },
            { path: "orders", element: <Orders /> },
            {
                path: "list-products",
                element: <ListOfProduct />,
                loader: () =>
                    import("./API/loader").then((module) => module.tokenCSRF()),
            },
            { path: "live-chat", element: <LiveChat /> },
            {
                path: "product",
                element: <ProductPage />,
                loader: () =>
                    import("./API/loader").then((module) => module.tokenCSRF()),
            },
            {
                path: "update/:productId",
                element: <EditProductPage />,
                loader: () =>
                    import("./API/loader").then((module) => module.tokenCSRF()),
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
        action: login,
    },
]);

function App() {
    // useEffect(() => {
    //     return () => {
    //         window.onbeforeunload = function () {
    //             localStorage.clear();
    //         };
    //     };
    // }, []);

    return <RouterProvider router={router} />;
}

export default App;
