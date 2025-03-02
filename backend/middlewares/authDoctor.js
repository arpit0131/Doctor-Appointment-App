import jwt from 'jsonwebtoken';

//user auth middleware
const authDoctor = async (req, res, next) => {
  try {
    const dToken = req.headers.dtoken || req.headers.dToken;

    if (!dToken) {
      return res.json({
        success: false,
        message: 'Not authorized! Login again',
      });
    }
    const token_decode = jwt.verify(dToken, process.env.JWT_SECRET); //here tokenDecode have user id
    req.docId = token_decode.id;
    next();
  } catch (e) {
    console.log('Error:-', e);
    res.json({ success: false, message: e.message });
  }
};
export default authDoctor;
