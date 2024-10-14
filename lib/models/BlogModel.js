import mongoose from "mongoose";

// defne schema of the blog 
const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },

    authorImg: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(), 
    },
})


// now based on above schema create a model blog is collection name
const BlogModel = mongoose.models.blog || mongoose.model('blog',Schema);

export default BlogModel;