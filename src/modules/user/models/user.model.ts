import { mongoose } from "../../../../deps.ts";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: { type: String }
});

export default mongoose.model('User', userSchema);
