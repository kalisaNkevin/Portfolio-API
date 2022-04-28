import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog should have a title']
    },
    body: {
      type: String,
      required: [true, 'Blog should have a body']
    },
    image: String,
    date: {
      type: Date,
      default: Date.now()
    },
    likedBy: [
      {
        type: Schema.ObjectId,
        ref: 'User'
      }
    ],
    comments: [
      {
        type: Schema.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

blogSchema.virtual('totalLikes').get(function() {
  return this.likedBy.length;
});
blogSchema.virtual('totalComments').get(function() {
  return this.comments.length;
});

const Blog = model('Blog', blogSchema);

export default Blog;