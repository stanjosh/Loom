import mongoose, { Schema, model, type InferSchemaType } from 'mongoose';

import autopopulate from 'mongoose-autopopulate';

const storySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    }
});

storySchema.plugin(autopopulate);

export type storySchema = InferSchemaType<typeof storySchema>;



const Story = mongoose.models.Story || model('Story', storySchema);

export default Story;
