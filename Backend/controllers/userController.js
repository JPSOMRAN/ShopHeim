import User from "../models/User.js";

// =======================================
// Get All Users (Admin)
// =======================================

export const getAllUsers = async (req, res) => {

  try {

    const users = await User.find()
  .select("-password")
  .sort({ createdAt: -1 });

    res.status(200).json({

      success: true,

      users,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// =======================================
// Get User By ID
// =======================================

export const getUserById = async (req, res) => {

  try {

    const user = await User.findById(req.params.id)

      .select("-password");

    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User Not Found",

      });

    }

    res.status(200).json({

      success: true,

      user,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// =======================================
// Delete User
// =======================================

export const deleteUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User Not Found",

      });

    }

    // Don't allow deleting admin accounts
    if (user.isAdmin) {

      return res.status(400).json({

        success: false,

        message: "Admin cannot be deleted",

      });

    }

    await user.deleteOne();

    res.status(200).json({

      success: true,

      message: "User Deleted Successfully",

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};