const app = require('../index');
const db = app.get('db');

const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = {
  // register: (req, res) => {
  //   const user = req.body;
  //   user.password = hashPassword(user.password);
  //   console.log(user);
  //   db.user_create([user.email, user.password], (err, user) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).send(err);
  //     }
  //     else {
  //       return res.status(200).send(err)
  //     }
  //   });
  // },
  me: (req, res) => {
    if (!req.user) return res.status(401).send('current user not defined');

    //remove password for security, do not send it back
    const user = req.user[0];
    delete user.password;

    //return user object without passwordreturn
    return res.status(200).json(user);
  }












  //end of export
}
