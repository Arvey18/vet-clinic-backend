class UsersController {
  constructor(Users, UserProfile) {
    this.Users = Users;
    this.UserProfile = UserProfile;
  }

  // function to get all users using header
  protectedGetUsers = async (_req, res) => {
    try {
      const users = await this.Users.findAll({
        attributes: ['user_id', 'email', 'created_at'],
      });

      return res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        error: error.message,
        name: error.name,
      });
    }
  };

  // function to get specific user by email
  protectedGetUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
      const user = await this.Users.findOne({
        attributes: ['email'],
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(200).json({
          success: true,
          message: 'Email does not exist!',
        });
      }

      const userProfile = await this.UserProfile.findOne({
        where: {
          email: user.email,
        },
      });

      return res.status(200).json({
        success: true,
        data: userProfile || {},
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        error: error.message,
        name: error.name,
      });
    }
  };
}

export default UsersController;
