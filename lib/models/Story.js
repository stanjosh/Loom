import { Schema, model, models } from 'mongoose';



const storySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: DataTypes.STRING(24),
        required: true
    },
    description: {
        type: DataTypes.TEXT,
        required: true
    },
    startingBranch: {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    }
});


storySchema.plugin(require('mongoose-autopopulate'));

const Story = models.Story || model('Story', storySchema);

export default Story;
