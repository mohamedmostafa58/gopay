import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../css/resetPassword.module.css";
import { reset, resetPassword } from "../redux/authSlice";
import FormInput from "./FormInput";
const ResetPassword = () => {
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password } = values;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const resetToken = location.pathname.split("/")[2];

  const { isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
      toast.success(message);
      navigate("/login");
    }
    dispatch(reset());
  }, [isSuccess, isError, message, navigate, dispatch]);

  const inputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
      pattern: "^[\\w]{6,}$",
      errormessage: "Password should be atleast 6 characters",
    },
    {
      id: 2,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      required: true,
      pattern: values.password,
      errormessage: "Passwords do not match",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ password, resetToken }));
  };

  const onChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={`${styles.resetPassword} bg-blue-100`}>
      <form onSubmit={handleSubmit} className="bg-cyan-700">
        <h1 className="text-2xl font-meduim text-red-700 ">Reset Password</h1>
        {inputs.map((input) => (
          <FormInput
            className={styles.formInput}
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button type="submit" >Reset Password</button>
        <span>
          Want to login? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default ResetPassword;
