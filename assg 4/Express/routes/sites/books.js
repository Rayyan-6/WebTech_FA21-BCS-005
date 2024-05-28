const express = require("express");
const router = express.Router();
const Book = require("../../models/Book");

// router.get("/books", async (req, res) => {
//   let books = await Book.find();
//   res.render("books/list", { pageTitle: "List of Available Books", books });
// });
 
// with pagination
// router.get("/books", async (req, res) => {
//   // Extract page and limit from query parameters, or use default values if not provided
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10; // Default limit of 10 items per page

//   try {
//     // Calculate the offset based on the page and limit
//     const offset = (page - 1) * limit;

//     // Query the database for a subset of books based on pagination criteria
//     const books = await Book.find()
//       .skip(offset)
//       .limit(limit);

//     // Get the total count of books (for pagination metadata)
//     const totalCount = await Book.countDocuments();

//     // Calculate total pages based on total count and limit
//     const totalPages = Math.ceil(totalCount / limit);

//     // Pass the books, current page, total pages, and other pagination metadata to the view
//     res.render("books/list", {
//       pageTitle: "List of Available Books",
//       books,
//       currentPage: page,
//       totalPages,
//       limit
//     });
//   } catch (error) {
//     console.error("Error fetching books:", error);
//     res.status(500).send("Error fetching books");
//   }
// });

// with search

router.get("/books", async (req, res) => {
  // Extract page, limit, and search query from query parameters
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10; // Default limit of 10 items per page
  const searchQuery = req.query.search || ''; // Default to an empty string if no search query is provided

  try {
    // Calculate the offset based on the page and limit
    const offset = (page - 1) * limit;

    // Create a filter object for the search query
    const filter = searchQuery
      ? { title: { $regex: searchQuery, $options: 'i' } } // Case-insensitive regex search
      : {};

    // Query the database for a subset of books based on pagination and search criteria
    const books = await Book.find(filter)
      .skip(offset)
      .limit(limit);

    // Get the total count of books matching the search criteria (for pagination metadata)
    const totalCount = await Book.countDocuments(filter);

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