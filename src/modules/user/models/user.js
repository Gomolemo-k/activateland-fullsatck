import { mongoose } from "../../../../deps.ts";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  confirmed: { type: Boolean, default: false },
  twoFAEnabled: { type: Boolean, default: false },
  twoFASecret: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

export default mongoose.model('User', userSchema);
