const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    // existing user check
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    // create hashed password
    const hashPassword = await bcrypt.hash(password, 10);

    // user creation
    const result = await userModel.create({
      username: username,
      password: hashPassword,
      email: email,
    });

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      email: result.email,
      id: result._id,
    };

    const token = jwt.sign(data, jwtSecretKey);
    res.status(200).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error found" });
  }
};

const signin = async (req, res) => {
  const { password, email } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "user not found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    let data = {
      email: existingUser.email,
      id: existingUser._id,
    };

    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    const token = jwt.sign(data, jwtSecretKey);

    res.status(200).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Found" });
  }
};

module.exports = { signup, signin };
