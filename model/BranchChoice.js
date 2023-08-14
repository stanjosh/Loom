const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
class BranchChoice extends Model {}

BranchChoice.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'branchchoice',
  }
);

module.exports = BranchChoice;
