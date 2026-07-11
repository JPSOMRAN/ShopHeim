import bcrypt from "bcryptjs";

import User from "../models/User.js";

import generateToken from "../utils/generateToken.js";

// =========================
// Register
// =========================

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      avatar: user.avatar,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// Login
// =========================

export const loginUser = async (req, res) => {
  try {

    const {
      email,
      password,
    } = req.body;

    const user = await User.findOne({
      email,
    });

    if (
      user &&
      (await bcrypt.compare(
        password,
        user.password
      ))
    ) {

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        avatar: user.avatar,
        token: generateToken(user._id),
      });

    } else {

      res.status(401).json({
        message: "Invalid Email Or Password",
      });

    }

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// =========================
// Get Profile
// =========================

export const getUserProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      avatar: user.avatar,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// =========================
// Update Profile
// =========================

export const updateUserProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.avatar = req.body.avatar || user.avatar;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      avatar: updatedUser.avatar,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};