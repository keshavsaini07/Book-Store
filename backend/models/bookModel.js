import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true

    },
    author: {
        type: String,
        required: true

    },
    year: {
        type: String,
        required: true

    },
},
{
    timestamps:true,
})

const bookModel = mongoose.model('Book', bookSchema);

export default bookModel;