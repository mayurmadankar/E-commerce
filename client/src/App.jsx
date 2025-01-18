import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login/login";
import AuthRegister from "./pages/auth/register/register";
import { RouterProvider } from "react-router-dom";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminFeatures from "./pages/admin-view/features";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/order";
import ShoppingLayout from "./components/shopping-view/layout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingAccount from "./pages/shopping-view/account";
import NotFound from "./pages/not-found";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth.jsx";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, checkAuth } from "./store/auth-slice/authSlice";
import { useEffect } from "react";
import Loader from "./components/loader/loader";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(authSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CheckAuth isAuthenticated={isAuthenticated} user={user} />
    },
    {
      path: "/auth",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout />
        </CheckAuth>
      ),
      children: [
        {
          path: "register",
          element: <AuthRegister />
        },
        { path: "login", element: <AuthLogin /> }
      ]
    },
    {
      path: "/admin",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckAuth>
      ),
      children: [
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "products", element: <AdminProducts /> },
        { path: "orders", element: <AdminOrders /> },
        { path: "features", element: <AdminFeatures /> }
      ]
    },
    {
      path: "/shop",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShoppingLayout />
        </CheckAuth>
      ),
      children: [
        { path: "home", element: <ShoppingHome /> },
        { path: "listing", element: <ShoppingListing /> },
        { path: "checkout", element: <ShoppingCheckout /> },
        { path: "account", element: <ShoppingAccount /> }
        // { path: "paypal-return", element: <PaypalReturnPage /> },
        // { path: "payment-success", element: <PaymentSuccessPage /> },
        // { path: "search", element: <SearchProducts /> }
      ]
    },
    {
      path: "*",
      element: <NotFound />
    },
    {
      path: "/unauth-page",
      element: <UnauthPage />
    }
  ]);
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
