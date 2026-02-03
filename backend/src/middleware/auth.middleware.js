import jwt from "jsonwebtoken";

// Protect routes by validating JWT from the Authorization header
const authMiddleware = (req, res, next) => {
  // Expect header format: "Bearer <token>"
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Extract token part after "Bearer "
  const token = authHeader.split(" ")[1];

  try {
    // Verify token and attach decoded payload to req.user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    // Token missing or invalid
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
