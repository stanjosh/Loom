import { Schema, model, models } from 'mongoose';


const choiceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
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
    required: false
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  }
    
});

choiceSchema.plugin(require('mongoose-autopopulate'));

const Choice = models.Choice || model('Choice', choiceSchema);
export default Choice;