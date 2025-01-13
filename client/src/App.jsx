import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
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

function App() {
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <AuthLogin /> },
        { path: "register", element: <AuthRegister /> }
      ]
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "products", element: <AdminProducts /> },
        { path: "orders", element: <AdminOrders /> },
        { path: "features", element: <AdminFeatures /> }
      ]
    },
    {
      path: "/",
      element: <ShoppingLayout />,
      children: [
        { path: "home", element: <ShoppingHome /> },
        { path: "listing", element: <ShoppingListing /> },
        { path: "checkout", element: <ShoppingCheckout /> },
        { path: "account", element: <ShoppingAccount /> },
        // { path: "paypal-return", element: <PaypalReturnPage /> },
        // { path: "payment-success", element: <PaymentSuccessPage /> },
        // { path: "search", element: <SearchProducts /> }
      ]
    },
    {
      path: "*",
      element: <NotFound />
    },
    // {
    //   path: "/unauth-page",
    //   element: <UnauthPage />
    // }
  ]);
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
