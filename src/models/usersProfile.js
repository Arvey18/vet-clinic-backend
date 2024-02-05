import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const UsersProfile = sequelize.define(
  'UsersProfile',
  {
    profile_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    display_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'users', // Assuming your users table is named 'users'
        key: 'email',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
  },
  {
    timestamps: false,
    tableName: 'users_profile',
  },
);

export default UsersProfile;
