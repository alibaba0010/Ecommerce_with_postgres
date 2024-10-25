import jwt from "jsonwebtoken";
import UnauthenticatedError from "../errors/unaunthenticated";
import UnAuthorizedError from "../errors/unauthorized";
import UserModel from "../model/user.model";

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;
  if (req.session.jwt) {
    token = req.session.jwt;
  } else if (authHeader) {
    ``;
    if (authHeader.startsWith("Bearer ")) token = authHeader.split(" ")[1];
  } else {
    throw new UnauthenticatedError("Please login in again");
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SEC);
    req.user = {
      userId: decode.userId,
      email: decode.email,
      isAdmin: decode.isAdmin,
    };

    next();
  } catch (err) {
    req.session = null;
    throw new UnauthenticatedError("Unable to authorize access, login again");
  }
};

// VERIFY USERS
export async function verifyUser(req, res, next) {
  const { email } = req.user;

  const user = await UserModel.checkEmailExists(email);

  if (user.length > 0) {
    next();
  } else {
    throw new UnAuthorizedError("Please login to access");
  }
}

// VERIFY ADMIN
export async function verifyAdmin(req, res, next) {
  const { userId } = req.user;
  const user = await UserModel.getUserById(userId);
  if (user.length === 0) {
    throw new UnauthenticatedError("User not authenticated");
  }
  if (user[0].isAdmin === true) {
    next();
  } else {
    throw new UnAuthorizedError("Only Admin is ascessible");
  }
}
