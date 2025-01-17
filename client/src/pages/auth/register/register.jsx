import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../register/register.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "@/store/auth-slice/authSlice";

const initialState = {
  userName: "",
  email: "",
  password: ""
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        console.log(data?.payload?.message);
        toast.success(data?.payload?.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce
        });
        navigate("/auth/login");
      } else {
        // console.log(data?.payload?.message);
        toast.error(data?.payload?.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce
        });
      }
    });
  }

  return (
    <div className="form-container">
      <div className="form">
        <div className="text-center">
          <h1 className="form-title">Create new account</h1>
          <p className="form-text">
            Already have an account?{" "}
            <Link className="form-link" to="/auth/login">
              Login
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default AuthRegister;
