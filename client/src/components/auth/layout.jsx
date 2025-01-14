import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Section */}
      <div className="flex flex-1 lg:flex-[1] items-center justify-center bg-black px-12 text-white">
        <div className="max-w-md space-y-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to ECommerce Shopping
          </h1>
          <p className="text-lg">
            Discover the best shopping experience tailored just for you. Sign up now!
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
