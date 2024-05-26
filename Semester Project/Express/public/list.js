const isAuthenticated = require("../middlewares/isAuthenticated");

$(document).ready(function() {
    $('#search-button').on('click', function() {
        const query = $('#search-input').val();
        searchBooks(query);
    });

    $('#search-input').on('keypress', function(event) {
        if (event.which === 13) { // Enter key pressed
            const query = $(this).val();
            searchBooks(query);
        }
    });

    function searchBooks(query) {
        console.log(" search pressed")
        // URL of the API endpoint
        const apiUrl = `http://localhost:4000/api/books?search=${encodeURIComponent(query)}`;
        // Make the API call
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(data) {
                console.log("inside search ajax succes")

                // Process the response data
                displayResults(data);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
                displayError(error);
            }
        });
    }

    function displayResults(data) {
        console.log("inside display results")
        const resultsContainer = $('#search-results');
        resultsContainer.empty(); // Clear previous results
    
        // Check if data is an array
        if (Array.isArray(data)) {
            // If data is an array, proceed with displaying results
            if (data.length === 0) {
                resultsContainer.html('<p>No results found</p>');
                return;
            }
    
            // Iterate over each item in the array and display its information
            data.forEach(item => {
                const itemElement = $(`
                    <div class="search-result-item">
                        <h3>${item.title}</h3>
                        <p>Author: ${item.author}</p>
                        <p>Genre: ${item.genre.join(', ')}</p>
                        <p>Year: ${item.year}</p>
                        <p>Price: ${item.price}</p>
                    </div>
                `);
                resultsContainer.append(itemElement);
            });
        } else if (typeof data === 'object') {
            // If data is an object, it might be an error response
            // Display an error message or handle it based on the response structure
            if (data.message) {
                resultsContainer.html(`<p>Error: ${data.message}</p>`);
            } else {
                resultsContainer.html(`<p>Error: Invalid data format1</p>`);
            }
        } else {
            // If data is neither an array nor an object, display an error message
            resultsContainer.html(`<p>Error: Invalid data format2</p>`);
        }
    }
    
    
    

    function displayError(error) {
        const resultsContainer = $('#search-results');
        resultsContainer.html(`<p class="error">An error occurred: ${error.message}</p>`);
    }
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