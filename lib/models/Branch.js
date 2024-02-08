
import { Schema, Model, models } from 'mongoose';



const branchSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
        
    },

    gameOver: {
        type: DataTypes.BOOLEAN,
        default: false,
        required: false
    },

    audio: {
        type: String,
        allowNull: true,
        default: 'hum'
    },

    choices: [{
        type: Schema.Types.ObjectId,
        ref: 'Choice',
    }]
});

branchSchema.plugin(require('mongoose-autopopulate'));

const Branch = models.Branch || Model('Branch', branchSchema);
export default Branch;
