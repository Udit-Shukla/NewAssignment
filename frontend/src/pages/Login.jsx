import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Divider, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const clickHandler = async () => {
    // validation of form data
    let hasError = false;
    let newErrors = { email: false, password: false };

    if (formData.email === "") {
      newErrors.email = true;
      hasError = true;
    }

    if (formData.password === "") {
      newErrors.password = true;
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      toast.error("Please fill all the fields");
      return;
    } else {
      toast.success("Login button clicked");
      navigate("/");
      console.log(formData);
    }

    // API call to login
    const response = await fetch("http://localhost:4000/api/v1/auth/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log(response.status);

    // if successful login clear the form data
    setFormData({
      email: "",
      password: "",
    });
    setErrors({
      email: false,
      password: false,
    });
  };

  const signupHandler = () => {
    console.log("Signup clicked");
    navigate("/sign-up");
  };

  const changeHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const clickHandler2 = () => {
    console.log("Google or Github clicked");
  };

  return (
    <div className="flex flex-row gap-8">
      <div className="flex flex-col w-[40%] mx-auto gap-8">
        <p className=" text-2xl m-4">Login Page</p>
        <TextField
          variant="outlined"
          label="Email"
          type="email"
          name="email"
          onChange={changeHandler}
          required
          error={errors.email}
          helperText={errors.email ? "Email is required" : ""}
          sx={{
            '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: 'red',
            }
          }}
        />
        <TextField
          variant="outlined"
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          required
          onChange={changeHandler}
          error={errors.password}
          helperText={errors.password ? "Password is required" : ""}
          sx={{
            '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: 'red',
            }
          }}  InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" onClick={clickHandler}>
          Log in
        </Button>
        <Divider>Or</Divider>

        <div className="flex flex-col w-[30%] mx-auto gap-4">
          <Button
            variant="outlined"
            onClick={clickHandler2}
            sx={{
              textTransform: "none",
              "&:hover": {
                borderColor: "gray",
              },
            }}
            className="hover:text-gray-500 hover:scale-90 duration-75"
          >
            Sign up using Google
          </Button>
          <Button
            variant="outlined"
            onClick={clickHandler2}
            sx={{
              textTransform: "none",
              "&:hover": {
                borderColor: "gray",
              },
            }}
            className="hover:text-gray-500 hover:scale-90 duration-75"
          >
            Sign up using Github
          </Button>
        </div>

        <div className="mx-auto">
          Don &apos;t have an account ?{" "}
          <Button
            variant="text"
            onClick={signupHandler}
            sx={{ textTransform: "none" }}
            className="hover:text-gray-500 hover:scale-90 duration-75"
          >
            Create an account
          </Button>
        </div>
      </div>
      <Divider orientation="vertical"></Divider>

      <img></img>
    </div>
  );
};

export default Login;
