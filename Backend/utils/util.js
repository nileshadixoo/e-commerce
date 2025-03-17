import jwt from 'jsonwebtoken'

export const createToken = async (user_email) => {
  try {
    const payload = { user: user_email };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    throw new error(error);
  }
};

export const verifyToken =  (token) => {
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        // Token is expired
        return { error: 'Token expired' }
      }}
};
