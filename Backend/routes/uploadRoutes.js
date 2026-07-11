import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// =====================================
// Upload Profile Image
// =====================================

router.post(
  "/",
  protect,
  upload.single("image"),
  (req, res) => {

    try {

      if (!req.file) {

        return res.status(400).json({

          success: false,

          message: "Please upload an image",

        });

      }

      res.status(200).json({

        success: true,

        message: "Image Uploaded Successfully",

        image: `/uploads/${req.file.filename}`,

      });

    }

    catch (error) {

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  }
);

export default router;