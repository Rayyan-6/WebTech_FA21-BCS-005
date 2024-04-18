const express = require("express");
const router = express.Router();
const Book = require("../../models/Book");

router.get("/books", async (req, res) => {
  let books = await Book.find();
  res.render("books/list", { pageTitle: "List All Books", books });
});

module.exports = router;