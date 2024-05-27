// const isAuthenticated = require("../middlewares/isAuthenticated");

$(document).ready(function() {
    // $('#search-button').on('click', function() {
    //     const query = $('#search-input').val();
    //     searchBooks(query);
    // });

    // $('#search-input').on('keypress', function(event) {
    //     if (event.which === 13) { // Enter key pressed
    //         const query = $(this).val();
    //         searchBooks(query);
    //     }
    // });

// Function to handle the search
// function searchBooks(query) {
//     console.log("search pressed");
//     // URL of the API endpoint
//     const apiUrl = `http://localhost:4000/api/books?search=${encodeURIComponent(query)}`;
//     // Make the API call
//     $.ajax({
//         url: apiUrl,
//         method: 'GET',
//         success: function(data) {
//             console.log("inside search ajax success");
//             // Process the response data
//             displayResults(data);
//         },
//         error: function(xhr, status, error) {
//             console.error('Error fetching data:', error);
//             displayError(error);
//         }
//     });
// }

// Function to display the search results
// function displayResults(data) {
//     const resultsContainer = document.getElementById('search-results');
//     resultsContainer.innerHTML = ''; // Clear previous results
//     if (data.length > 0) {
//         const ul = document.createElement('ul');
//         data.forEach(book => {
//             const li = document.createElement('li');
//             li.textContent = `${book.title} by ${book.author}`;
//             ul.appendChild(li);
//         });
//         resultsContainer.appendChild(ul);
//     } else {
//         resultsContainer.textContent = 'No results found.';
//     }
// }

// Function to display errors
// function displayError(error) {
//     const resultsContainer = document.getElementById('search-results');
//     resultsContainer.innerHTML = ''; // Clear previous results
//     resultsContainer.textContent = `Error: ${error}`;
// }

// Attach event listener to the search button
// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('search-button').addEventListener('click', function() {
//         const query = document.getElementById('search-input').value;
//         searchBooks(query);
//     });
// });
});   

function buyBook(title) {
    // You can implement the logic for buying a book here
    alert("You have bought the book: " + title);
  }
  function blurBook(){
    alert("Please login first")
  }

// function buyBook(bookTitle) {
   
//     fetch('/cart', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ title: bookTitle }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.success) {
//         alert('Book added to cart successfully!');
//       } else {
//         alert('Failed to add book to cart.');
//       }
//     })
//     .catch(error => {
//       console.log('Error adding book to cart:', error);
//       alert('Error adding book to cart.');
//     });
//   }