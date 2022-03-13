const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //sample headers is (Bearer sdjsffbsfb_jsonwebtoken_cvcnv) so we split on space ""
    //and pick the second split [1].
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new ErrorResponse("Not Authorised to access this route // token", 401)
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse("No user was found with this id", 404));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};
