const Members = require('../models/memberModel');

const authAdmin = async (req, res, next) => {
  try {
    // Get Member information by id
    const member = await Members.findOne({
      _id: req.member.id,
    });
    if (member.role === 'worker')
      return res.status(400).json({ msg: 'Admin resources access denied' });
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authAdmin;
