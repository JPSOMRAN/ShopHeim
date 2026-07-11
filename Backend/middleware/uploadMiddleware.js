import multer from "multer";
import path from "path";

// ======================================
// Storage Configuration
// ======================================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");

  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);

  },

});

// ======================================
// File Filter
// ======================================

const fileFilter = (req, file, cb) => {

  const allowedTypes =
    /jpg|jpeg|png|webp/;

  const extensionValid =
    allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

  const mimeValid =
    allowedTypes.test(file.mimetype);

  if (extensionValid && mimeValid) {

    cb(null, true);

  }

  else {

    cb(

      new Error(

        "Only JPG, JPEG, PNG and WEBP images are allowed."

      )

    );

  }

};

// ======================================
// Multer Upload
// ======================================

const upload = multer({

  storage,

  fileFilter,

  limits: {

    fileSize: 2 * 1024 * 1024,

  },

});

export default upload;