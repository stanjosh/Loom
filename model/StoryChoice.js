const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const User = require('./User');
const Branch = require('./Branch.js')
const Story = require('./Story.js')
class StoryChoice extends Model {}

StoryChoice.init(
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
    story_id: {
        type: DataTypes.UUID,
        references: {
            model: Story,
            key: 'id'
        }
    },
    choice_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    next_branch: {
        type: DataTypes.UUID,
        references: {
            model: Branch,
            key: 'id'
        },
        allowNull: false
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
    modelName: 'storychoice',
  }
);

module.exports = StoryChoice;
