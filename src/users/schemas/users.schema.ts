import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const { Schema } = mongoose;

export const UsersShema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

UsersShema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);

    return next();
  } catch (err) {
    return next(err);
  }
});