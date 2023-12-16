import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
    
    },
   slug: String,
   public_id: String,
   imgUrl: String,
   imgName: String,
   blurHash: String,
   tags: [],
   public: {
    type: Boolean,
    default: false
   },
   user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {timestamps: true})

export default mongoose?.models?.Post || mongoose.model("Post", PostSchema)