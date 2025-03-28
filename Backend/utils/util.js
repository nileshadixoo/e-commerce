import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


const secret = process.env.JWT_SECRET || "nothingspecial";
export const createToken = async (user_email) => {
 
  try {
    const payload = { user: user_email };
    const token =  jwt.sign(payload, secret, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

export const verifyToken =  (token) => {
    try {
        var decoded = jwt.verify(token,secret);
        return decoded;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        // Token is expired
        return { error: 'Token expired' }
      }}
};
