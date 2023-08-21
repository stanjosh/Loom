const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const User = require('./User');
const Story = require('./Story')
const Choice = require('./Choice')
class Branch extends Model {}

Branch.init(
  {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
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
    branch_title: {
        type: DataTypes.STRING(24),
        allowNull: false
        
    },
    branch_content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    received_item: {
        type: DataTypes.STRING,
        allowNull: true
    },
    removed_item: {
        type: DataTypes.STRING,
        allowNull: true
    },
    end_here: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    ambient_track: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'hum'
    },
    sound_effect: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    visual_effect: {
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
    modelName: 'branch',
  }
);



module.exports = Branch;
