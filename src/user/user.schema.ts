import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: { type: mongoose.SchemaTypes.ObjectId, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
