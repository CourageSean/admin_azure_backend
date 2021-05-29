const Members = require('../models/memberModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const memberController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const member = await Members.findOne({ email });
      if (member)
        return res.status(400).json({ msg: 'The email allready exist' });

      //Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newMember = new Members({
        name,
        email,
        password,
      });
      // Save mongodb

      await newMember.save();

      // Then create jsonwebtoken for authentication
      const accesstoken = createAccessToken({ id: newMember._id });
      const refreshtoken = createRefreshToken({ id: newMember._id });

      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/member/refresh_token',
      });
      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const member = await Member.findOne({ email });
      if (!member)
        return res.status(400).json({ msg: 'Member does not exist.' });
      const isMatch = await bcrypt.compare(passowrd, member.password);
      if (!isMatch) return res.status(400).json({ msg: 'Incorrect password.' });

      //If Login success, create access token and refresh token
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: 'please login or register' });
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, member) => {
        if (err)
          return res.status(400).json({ msg: 'please login or register' });

        const accesstoken = createAccessToken({ id: member.id });

        res.json({ member, accesstoken });
      });
      res.json({ rf_token });
    } catch (err) {}
  },
};

const createAccessToken = (member) => {
  return jwt.sign(member, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '12h',
  });
};
const createRefreshToken = (member) => {
  return jwt.sign(member, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};
module.exports = memberController;
