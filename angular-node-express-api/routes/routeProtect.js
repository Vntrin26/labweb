const expressJwt = require('express-jwt');



const authenticate = expressJwt({
    secret: "secret"
});
  
module.exports = authenticate;

