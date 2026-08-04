import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "algovia_super_secret_jwt_key_production_2026";

/**
 * Production JWT Authentication Guard Middleware
 */
export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token missing. Authentication required."
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired access token."
      });
    }

    req.user = decodedUser;
    next();
  });
}
