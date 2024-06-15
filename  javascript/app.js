// Add event listener to search button with id 'search-btn'
document.getElementById('search-btn').addEventListener('click', () => {
    // Get the input value from the input field with id 'input'
    const input = document.getElementById("input").value;
    // Get the div where similar movies will be displayed
    const similarMoviesDiv = document.getElementById("similarMovies");
    // Clear previous results from similarMoviesDiv
    similarMoviesDiv.innerHTML = "";

    // Fetch movie data from the server using input as the movie query parameter
    fetch(`http://localhost:5000/search?movie=${input}`)
        .then(response => {
            // Check if response is not OK (status code other than 200)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Parse response body as JSON
            return response.json();
        })
        .then(data => {
            let moviesData = '';  // Initialize variable to store HTML for movies

            // If movie data is not found, display message
            if (!data.movie) {
                moviesData = `<p>Movie not found</p>`;
                similarMoviesDiv.innerHTML = moviesData;
                return;
            }

            // Display main movie details
            moviesData += `
                <div class="treandingmovies">
                    <img src="https://image.tmdb.org/t/p/w500/${data.movie.poster_path}" alt="${data.movie.title}" class="images">
                    <h1>${data.movie.title}</h1>
                </div>
            `;

            // If no similar movies found, display message
            if (data.similarMovies.length === 0) {
                moviesData += `<p>No similar movies found</p>`;
            } else {
                // Display each similar movie
                data.similarMovies.forEach(similarMovie => {
                    moviesData += `
                        <div class="treandingmovies">
                            <img src="https://image.tmdb.org/t/p/w500/${similarMovie.poster_path}" alt="${similarMovie.title}" class="images">
                            <h1>${similarMovie.title}</h1>
                        </div>
                    `;
                });
            }

            // Update similarMoviesDiv with the generated HTML
            similarMoviesDiv.innerHTML = moviesData;
        })
        .catch(error => {
            console.error('Error:', error);  // Log any errors to the console
        });
});