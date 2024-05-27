
        // Function to get search query from URL
        function getQueryParameter(name) {
            const urlParams = new URLSearchParams(window.location.search);
            console.log(urlParams.get(name))

            return urlParams.get(name);
        }

        // Function to fetch search results
        function fetchSearchResults(query) {
            const apiUrl = `http://localhost:4000/api/books?search=${encodeURIComponent(query)}`;
            $.ajax({
                url: apiUrl,
                method: 'GET',
                success: function(data) {
                    console.log("display results executed in fetchSearchResults")
                    displayResults(data);
                },
                error: function(xhr, status, error) {
                    console.log("Error statement in fetchSearchResults")

                    displayError(error);
                }
            });
        }

        // Function to display the search results
        function displayResults(data) {
            const resultsContainer = document.getElementById('search-results');
            resultsContainer.innerHTML = ''; // Clear previous results
            if (data.length > 0) {
                const ul = document.createElement('ul');
                data.forEach(book => {
                    const li = document.createElement('li');
                    li.textContent = `${book.title} by ${book.author}`;
                    ul.appendChild(li);
                });
                resultsContainer.appendChild(ul);
            } else {
                resultsContainer.textContent = 'No results found.';
            }
        }

        // Function to display errors
        function displayError(error) {
            const resultsContainer = document.getElementById('search-results');
            resultsContainer.innerHTML = ''; // Clear previous results
            resultsContainer.textContent = `Error: ${error}`;
        }

        // On page load, fetch and display search results
        $(document).ready(function() {
            const query = getQueryParameter('search');
            if (query) {
                fetchSearchResults(query);
            }
        });
 


        // for storing search query

        // Assuming you have already set up a MongoDB connection and have a collection named 'searchHistory'


  