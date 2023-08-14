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
        },
        allowNull: false
    },
    reference_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
    },
    branch_title: {
        type: DataTypes.STRING,
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
    start_here: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    end_here: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
