const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const User = require('./User');

class Branch extends Model {}

Branch.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id:{
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id'
      },
      allowNull: false
    },
    branch_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    branch_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    story_choices: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: StoryChoice,
            key: 'id'
        },
        allowNull: false
    },
    post_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'branch',
  }
);

module.exports = Branch;
