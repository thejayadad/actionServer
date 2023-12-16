import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
      },
      name: {
        type: String,
        required: [true, 'Name is required!'],
        unique: true

      },
      avatar: String,
      public_id: String,
      followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],
      following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }]
}, {timestamps: true})

export default mongoose?.models?.User || mongoose.model("User", UserSchema)