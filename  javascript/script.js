// Options object for fetch request
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZWU0NDNkMjBhMjQ4ZDhkNTA0MDc1ZjYzYWY1MzU4NyIsInN1YiI6IjY2NjczMjljY2M3MDc0ZDliNjFjMmNmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2cJH9dOAsqMd3s1j-PN4YZsLEPavFUQEUL2re-zpcJI'
  }
};

// Fetch data from TMDb API
fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
  .then((response) => response.json())  // Parse response body as JSON
  .then((data) => {
    let moviesData = "";  // Initialize variable to store HTML for movies

    // Loop through each movie result in the data
    for (let i = 0; i < data.results.length; i++) {
      let item = data.results[i];  // Get current movie item

      // Construct HTML for each movie item
      let movieHTML = `
        <div class="treandingmovies">
          <img src="http://image.tmdb.org/t/p/w500/${item.poster_path}" alt="productimg" class="images">
          <h1>${item.title}</h1>
        </div>
      `;
      moviesData += movieHTML;  // Append movie HTML to moviesData
    }

    // Get the container element where movies will be displayed
    let moviesContainer = document.querySelector(".trending-movies");

    // Update the container with the generated HTML for movies
    moviesContainer.innerHTML = moviesData;
  })
  .catch((error) => {
    console.error("Error fetching data from TMDb API:", error);  // Log any errors to the console
  });
