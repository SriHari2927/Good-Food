const { generateToken } = require('../utils/jwt');

const googleCallback = (req, res) => {

  const user = req.user;

  const token = generateToken(user);
 
  console.log("USER",user)

  console.log("TOKEN",token)
  
  res.redirect(`${process.env.CLIENT_URL}/?token=${token}`)
};

const failure = (req, res) => {
  res.send('Failed...!');
};

module.exports = { googleCallback, failure };


