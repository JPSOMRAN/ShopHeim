const admin = (req, res, next) => {

  if (req.user && req.user.isAdmin) {

    next();

  } else {

    return res.status(403).json({

      success: false,

      message: "Admin Access Only",

    });

  }

};

export default admin;