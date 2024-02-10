import mongoose, { Schema, model, type InferSchemaType } from 'mongoose';

import autopopulate from 'mongoose-autopopulate';

const branchSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    description: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
        
    },

    gameOver: {
        type: Boolean,
        default: false,
        required: false
    },

    receivedItem: {
        type: String,
        required: false
    },
    removedItem: {
        type: String,
        required: false
    },

    audio: {
        type: String,
        allowNull: true,
        default: 'hum'
    },

    choices: [{
            type: Schema.Types.ObjectId,
            ref: 'Branch',
            required: false,
            autopopulate: true
        }]
});



branchSchema.plugin(autopopulate);

type Branch = InferSchemaType<typeof branchSchema>;

const Branch = mongoose.models.Branch || model('Branch', branchSchema);
export default Branch;
