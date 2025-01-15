import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const token = res.cookie.jwtToken;

  if (!token) return res.status(401).send("No token, authorization denied");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    // console.log(req.userId);
  } catch (error) {
    return res.status(401).send("Token is not valid");
  }
  next();
};

export default jwtAuth;
