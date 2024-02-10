import mongoose, { Schema, model, type InferSchemaType } from 'mongoose';

import autopopulate from 'mongoose-autopopulate';
import bcrypt from 'bcrypt';


const userSchema = new Schema({
    username:{
      type: String,
      unique: true,
      default: 'some jerk',
    },
    email:{
      type: String,
      required: true,
      unique: true,
    },
    password:{
      type: String,
      required: true,
    },
  },
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10; // salt isn't round 
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});


userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.plugin(autopopulate);


type User = InferSchemaType<typeof userSchema>;


const User = mongoose.models.User || model('User', userSchema);


export default User;