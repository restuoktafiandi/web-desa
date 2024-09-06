const { User } = require("./../models");
const jwtUtils = require("./../utils/jwt");

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      throw {
        code: 401,
        message: "Token not provided!"
      };
    }

    const decode = jwtUtils.verifyToken(token);

    const userData = await User.findOne({
      where: {
        id: decode.id,
        fullname: decode.fullname
      }
    });

    if (!userData) {
      throw {
        code: 401,
        message: "User not found"
      };
    }

    req.userData = {
      id: userData.id,
      email: userData.email,
    };

    next();

  } catch (error) {
    res.status(error.code || 500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = {
  authentication
};