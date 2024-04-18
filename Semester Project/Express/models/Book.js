const mongoose=require("mongoose");

let bookSchema = mongoose.Schema({
    title:String,
    author:String,
    genre:String,
    year:Number,
});

let Book = mongoose.model("Book", bookSchema);
module.exports=Book;