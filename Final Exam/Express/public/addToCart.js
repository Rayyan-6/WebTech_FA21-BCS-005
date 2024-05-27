// const express = require('express');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const app = express();

// app.use(bodyParser.json());
// app.use(session({
//   secret: 'yourSecretKey',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } // Set to true if using HTTPS
// }));

// // Example Book Data
// const books = [
//   { title: 'Book 1', author: 'Author 1', genre: ['Genre 1'], year: 2020, price: 500 },
//   { title: 'Book 2', author: 'Author 2', genre: ['Genre 2'], year: 2021, price: 600 },
//   // Add more book data as needed
// ];

// // Middleware to initialize cart
// app.use((req, res, next) => {
//   if (!req.session.cart) {
//     req.session.cart = [];
//   }
//   next();
// });

// // Route to handle adding books to cart
// app.post('/cart', (req, res) => {
//   const bookTitle = req.body.title;
//   const book = books.find(b => b.title === bookTitle);

//   if (book) {
//     req.session.cart.push(book);
//     res.json({ success: true });
//   } else {
//     res.json({ success: false });
//   }
// });

// // Example route to display the cart
// app.get('/cart', (req, res) => {
//   res.json(req.session.cart);
// });