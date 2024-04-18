let express = require("express");
let router = express.Router();
let Book = require("../../models/Book");

router.get("/api/books/:id", async (req, res) => {
    let book = await Book.findById(req.params.id);
    return res.send(book);
  });

  router.put("/api/books/:id", async (req, res) => {
    let book = await Book.findById(req.params.id);
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.year = req.body.year;
    await book.save();
    return res.send(book);
  });

  router.delete("/api/books/:id", async (req, res) => {
    let book = await Book.findByIdAndDelete(req.params.id);
    return res.send(book);
  });

  router.post("/api/books", async (req, res) => {
    let data = req.body;
    let record = new Book(data);
    await record.save();
    return res.send(record);
  });
  router.get("/api/books", async function (req, res) {
    let books = await Book.find();
    return res.send(books);
  });

  module.exports = router;