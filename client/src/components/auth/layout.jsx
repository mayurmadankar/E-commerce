import { Outlet } from "react-router-dom";
import "../auth/layout.css";

function AuthLayout() {
  return (
    <div className="auth-layout">
      {/* Left Section */}
      <div className="auth-left">
        <div className="auth-left-content">
          <h1>Welcome to ECommerce Shopping</h1>
          <p>
            Discover the best shopping experience tailored just for you. Sign up
            now!
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="auth-right">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
