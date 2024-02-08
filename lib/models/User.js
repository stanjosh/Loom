const { Schema, model } = require('mongoose');

const bcrypt = require('bcryptjs');

User.init({
    username:{
      type: DataTypes.STRING,
      unique: true,
      default: 'some jerk',
    },
    email:{
      type: DataTypes.STRING,
      required: true,
      unique: true,
      validate:{
        isEmail: true
      }
    },
    password:{
      type: DataTypes.STRING,
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

const User = model('User', userSchema);

User.ensureIndexes();

module.exports = User;