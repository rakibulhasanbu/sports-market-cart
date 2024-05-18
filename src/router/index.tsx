import { createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/auth/sign-up";
import SignIn from "../pages/auth/sign-in";
import App from "../App";
import ProtectedRoute from "../layout/ProtectedRoute";
import ManageProducts from "../pages/ManageProducts";
import AddProduct from "../pages/AddProduct";
import SalesHistory from "../pages/SalesHistory";
import EditProduct from "../pages/EditProduct";
import CreateVariant from "../pages/CreateVariant";
import ManageUser from "../pages/ManageUser";
import ManageManager from "../pages/ManageManager";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><App /></ProtectedRoute>,
        children: [
            // {
            //     path: "/",
            //     element: <Dashboard />
            // },
            {
                path: "/",
                element: <ManageProducts />
            },
            {
                path: "/add-product",
                element: <AddProduct />
            },
            {
                path: "/create-variant/:id",
                element: <CreateVariant />
            },
            {
                path: "/edit-product/:id",
                element: <EditProduct />
            },
            {
                path: "/sales-history",
                element: <SalesHistory />
            },
            {
                path: "/sellers-list",
                element: <ManageUser />
            },
            {
                path: "/managers-list",
                element: <ManageManager />
            },
        ]
    },
    {
        path: "/auth/sign-in",
        element: <SignIn />,
    },
    {
        path: "/auth/sign-up",
        element: <SignUp />,
    },
]);

export default router;