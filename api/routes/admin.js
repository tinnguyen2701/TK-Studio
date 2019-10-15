/* eslint-disable */
const adminRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Account = require('../models/account');

adminRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.sendStatus(403);

  await Account.findOne({ username }).then(user => {
    if (!user) return res.sendStatus(403);

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' }, function(
          err,
          token,
        ) {
          return res.status(200).send({
            success: true,
            token: token,
          });
        });
      } else {
        return res.sendStatus(403);
      }
    });
  });
});

adminRouter.post(
  '/changePassword',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword)
      return res.status(403).send({ success: false, message: 'this field is required' });

    Account.findOne({ username: req.user.username }).then(user => {
      bcrypt.compare(oldPassword, user.password, async function(err, isMatch) {
        if (!isMatch) {
          return res.send({ message: 'old password was wrong', success: false });
        } else {
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newPassword, salt, async function(err, hash) {
              user.password = hash;
              await user
                .save()
                .then(() => res.status(200).send({ message: 'Change success', success: true }));
            });
          });
        }
      });
    });
  },
);

adminRouter.get('/currentUser', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.sendStatus(200);
});

module.exports = adminRouter;
