const jwt = require("jsonwebtoken");
require("dotenv").config();
//const secretKey = process.env.REACT_ACCESS_TOKEN_SECRET;

const secretKey = 'abd%6sdfkj';
const createAccessToken = (payload) => {
  return jwt.sign(payload, secretKey, {expiresIn : "1h"});  
}

module.exports = {
  createAccessToken,
}