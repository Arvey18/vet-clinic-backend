const db = require('../db');

exports.protectedGetUsers = async (req, res) => {
  try {
    const { rows } = await db.query('select user_id, email, created_at from users');
    return res.status(200).json({
      success: true,
      users: rows,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.protectedGetUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const users = await db.query('select email from users where email=$1', [email]);
    if (!users?.rows.length) {
      return res.status(200).json({
        success: true,
        message: 'Email does not exist!',
      });
    }
    const userProfile = await db.query('select * from users_profile where email=$1', [users.rows[0].email]);
    return res.status(200).json({
      success: true,
      data: userProfile.rows.length ? userProfile.rows[0] : {},
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
