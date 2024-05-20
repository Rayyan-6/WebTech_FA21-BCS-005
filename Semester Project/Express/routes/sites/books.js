const express = require("express");
const router = express.Router();
const Book = require("../../models/Book");

// router.get("/books", async (req, res) => {
//   let books = await Book.find();
//   res.render("books/list", { pageTitle: "List of Available Books", books });
// });
 
// tried pagination
router.get("/books", async (req, res) => {
  // Extract page and limit from query parameters, or use default values if not provided
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10; // Default limit of 10 items per page

  try {
    // Calculate the offset based on the page and limit
    const offset = (page - 1) * limit;

    // Query the database for a subset of books based on pagination criteria
    const books = await Book.find()
      .skip(offset)
      .limit(limit);

    // Get the total count of books (for pagination metadata)
    const totalCount = await Book.countDocuments();

    // Calculate total pages based on total count and limit
    const totalPages = Math.ceil(totalCount / limit);

    // Pass the books, current page, total pages, and other pagination metadata to the view
    res.render("books/list", {
      pageTitle: "List of Available Books",
      books,
      currentPage: page,
      totalPages,
      limit
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Error fetching books");
  }
});

module.exports = router;