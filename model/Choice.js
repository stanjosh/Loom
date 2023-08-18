const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const User = require('./User.js');
const Branch = require('./Branch.js')
const Story = require('./Story.js')
class Choice extends Model {}

Choice.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    user_id:{
      type: DataTypes.UUID,
      references: {
        model: 'user',
        key: 'id'
      },
      allowNull: false
    },
    story_id: {
      type: DataTypes.UUID,
      references: {
        model: 'story',
        key: 'id'
      },
      allowNull: false
    },
    branch_id: {
      type: DataTypes.UUID,
      references: {
        model: 'branch',
        key: 'id'
      },
      allowNull: false
    },
    choice_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    next_branch: {
        type: DataTypes.UUID,
        allowNull: true
    },
    required_item: {
      type: DataTypes.STRING,
      allowNull: true
    },
    choice_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'choice'
    },
    fail_branch: {
      type: DataTypes.STRING,
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'choice',
  }
);



module.exports = Choice;
