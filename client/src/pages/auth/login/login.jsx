import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../login/login.css"

const initialState = {
  email: "",
  password: ""
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive"
        });
      }
    });
  }

  return (
    <div className="auth-login-container">
      <div className="auth-login">
        <div className="auth-login-header">
          <h1>Sign in to your account</h1>
          <p>
            Don't have an account?
            <Link to="/auth/register" className="auth-login-link">
              Register
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default AuthLogin;
