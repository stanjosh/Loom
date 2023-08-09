const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const User = require('./User');
const Branch = require('./Branch')
class Story extends Model {}

Story.init(
  {
    starting_branch: {
        references: {
            model: Branch,
            key: id
        }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'story',
  }
);

module.exports = Story;
