import jwt from 'jsonwebtoken';

//user auth middleware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: 'Not authorized! Login again',
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET); //here tokenDecode have user id
    req.body.userId = token_decode.id;
    next();
  } catch (e) {
    console.log('Error:-', e);
    res.json({ success: false, message: e.message });
  }
};
export default authUser;
