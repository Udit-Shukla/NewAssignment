const bcrypt = require("bcryptjs")
// signup controller
const jwt = require("jsonwebtoken")
const { validateEmail } = require("../utils/validateEmail");
const User = require("../models/User");

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // validating if all the fields are present
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  // validating if the email is valid
  if (!validateEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email" });
  }

  // validating if the password is strong
  if (password.length < 6) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Password should be atleast 6 characters",
      });
  }

  // hashing the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // creating a new user
  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  // saving the user to the database
  try {
    await user.save();
    return res
      .status(201)
      .json({ success: true, message: "User created successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// login controller
exports.login = async (req, res) => {
  try{
    const { email, password } = req.body;

  // validating if all the fields are present
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  // validating if the email is valid
  if (!validateEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email" });
  }

  // finding the user with the given email
  const user = await User.findOne({ email });

  // if user doesnt already exists
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "User does not exist" });
  }


  // generating jwt token
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
      // saving token to user document in database
        user.token = token;

        // create cookie 
        const options ={
            expires: new Date(Date.now() + 24*60*60*1000),
            httpOnly: true,
        }
        res.cookie('token', token, options).status(200).json({
            success: true,
            message: 'User logged in successfully',
            token,
            user
        });
  }
    else{
        return res.status(400).json({success: false, message: 'Invalid password'});
    }
  }
    catch(err){
        return res.status(500).json({success: false, message: 'Internal server error',
        error: err.message
        });
    }
};
