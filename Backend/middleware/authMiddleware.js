import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    try {

      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = await User.findById(
        decoded.id
      ).select("-password");

      // ==========================
      // TEMPORARY TEST
      // ==========================

      console.log("isAdmin:", req.user.isAdmin);
      console.log("type:", typeof req.user.isAdmin);

      next();

    }

    catch (error) {

      return res.status(401).json({

        message: "Not Authorized",

      });

    }

  }

  else {

    return res.status(401).json({

      message: "No Token",

    });

  }

};

export default protect;