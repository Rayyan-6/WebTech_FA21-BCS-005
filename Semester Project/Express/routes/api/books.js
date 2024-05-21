let express = require("express");
let router = express.Router();
let Book = require("../../models/Book");

// read all
// router.get("/api/books", async function (req, res) {
//   let books = await Book.find();
//   return res.send(books);
// });

// Route to get books with pagination
router.get("/api/books", async function (req, res) {
  // Extract page and limit from query parameters with default values
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch the subset of books
    const books = await Book.find().skip(skip).limit(limit);

    // Get the total number of documents in the collection
    const totalBooks = await Book.countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalBooks / limit);

    // Respond with paginated results
    res.json({
      data: books,
      totalBooks: totalBooks,
      totalPages: totalPages,
      currentPage: page,
      limit: limit
    });
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
});


///////////////////////////////////////////////////////////
// read one
router.get("/books/:id", async (req, res) => {
  try{
    let book = await Book.findById(req.params.id);
    // return res.send(book);
    return res.render("books/oneBook",{ pageTitle: "Searched Book", book });
    
  }
  catch(err){
    return res.status(400).send("Invalid ID");
  }
  });

  // update
  router.put("/api/books/:id", async (req, res) => {
    let book = await Book.findById(req.params.id);
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.year = req.body.year;
    book.price = req.body.price;
    await book.save();
    return res.send(book);
  });

  // delete
  router.delete("/api/books/:id", async (req, res) => {
    let book = await Book.findByIdAndDelete(req.params.id);
    return res.send(book);
  });

  // create
  router.post("/api/books", async (req, res) => {
    let data = req.body;
    let record = new Book(data);
    await record.save();
    return res.send(record);
  });



  module.exports = router;