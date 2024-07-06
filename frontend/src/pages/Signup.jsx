import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Divider, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    firstname: false,
    lastName: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const clickHandler = async() => {
    // validation of form data
    let hasError = false;
    let newErrors = {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
    };

    if (formData.email === "") {
      newErrors.email = true;
      hasError = true;
    }

    if (formData.password === "") {
      newErrors.password = true;
      hasError = true;
    }

    if (formData.firstName === "") {
      newErrors.firstName = true;
      hasError = true;
    }

    if (formData.lastName === "") {
      newErrors.lastName = true;
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      toast.error("Please fill all the fields");
      return;
    } 
    

    // API call to sign up
    const response = await fetch("http://localhost:4000/api/v1/auth/signup",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log(response.status);
   switch(response.status){
      case 201:
        toast.success("User registered successfully");
        navigate("/login");
        break;
      case 400:
        toast.error("User already exists");
        break;
      case 500:
        toast.error("Internal server error");
        break;
      default:
        toast.error("Something went wrong");
        break;
   }
  };

  const loginHandler = () => {
    console.log("Login clicked");
    navigate("/login");
  };

  const changeHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const clickHandler2 = () => {
    console.log("Google or Github clicked");
  };

  return (
    <div className="flex flex-row gap-8">
      <div className="flex flex-col w-[70%] mx-auto gap-6 lg:w-[60%] lg:mx-auto md:w-[50%] md:mx-auto ">
        <p className="text-2xl m-4">Sign Up Page</p>
        <div className="flex flex-col gap-4 w-full justify-between md:flex-row">
          <TextField
            className="w-full md:w-[45%] "
            variant="outlined"
            label="First Name"
            type="text"
            name="firstName"
            onChange={changeHandler}
            required
            error={errors.firstName}
            helperText={errors.firstName ? "First name is required" : ""}
            sx={{
              '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                borderColor: 'red',
              }
            }}
          />
          <TextField
            className="w-full md:w-[45%]"
            variant="outlined"
            label="Last Name"
            type="text"
            name="lastName"
            onChange={changeHandler}
            required
            error={errors.lastName}
            helperText={errors.lastName ? "Last name is required" : ""}
            sx={{
              '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                borderColor: 'red',
              }
            }}
          />
        </div>
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
          }}
          InputProps={{
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
          Sign Up
        </Button>
        <Divider>Or</Divider>

        <div className="flex flex-col w-max mx-auto gap-4 ">
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
          Already have an account?{" "}
          <Button
            variant="text"
            onClick={loginHandler}
            sx={{ textTransform: "none" }}
            className="hover:text-gray-500 hover:scale-90 duration-75"
          >
            Login to your account
          </Button>
        </div>
      </div>
      <Divider orientation="vertical"></Divider>

      <img></img>
    </div>
  );
};

export default SignUp;
