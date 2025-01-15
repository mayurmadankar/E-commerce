import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../register/register.css";
import { useToast } from "@/components/ui/use-toast";
import { registerUser, resetToast } from "@/store/auth-slice/authSlice";

const initialState = {
  userName: "",
  email: "",
  password: ""
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        // console.log(data?.payload?.message);
        toast({
          title: data?.payload?.message
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive"
        });
      }
      // setTimeout(() => {
      //   dispatch(resetToast());
      // }, 2000);
    });
  }

  // console.log(formData);

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
