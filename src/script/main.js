const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
  const inputKeyword = document.querySelector('.input-keyword');
  const movies = await getMovies(inputKeyword.value);
  updateUI(movies);
})

function getMovies(keyword) {
  return fetch('https://api.themoviedb.org/3/search/movie?api_key=e6ff8aea4a21b34b664e284a6e977f3e&language=en-US&query=' + keyword)
    .then(response => response.json())
    .then(response => response.results);
}

function updateUI(movies) {
  let cards = '';
  movies.forEach(m => cards += showMovie(m));
  const movieContainer = document.querySelector('.movie-container');
  movieContainer.innerHTML = cards;
}

document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('modal-detail-button')) {
    const id = e.target.dataset.movieid;
    const movieDetail = await getMoviesDetail(id);
    updateUIDetail(movieDetail);
  }
})

function getMoviesDetail(id) {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=e6ff8aea4a21b34b664e284a6e977f3e&language=en-US')
    .then(response => response.json())
    .then(m => m);
}

function updateUIDetail(m) {
  const movieDetail = showMovieDetails(m);
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = movieDetail;
}

function showMovie(m) {
  return `<div class="col-md-6 col-lg-4 col-xl-3 my-4">
    <div class="card card-movie">
      <img
        src="https://image.tmdb.org/t/p/w500${m.poster_path}"
        class="card-img-top"
        alt="..."
        style="height:500px; object-fit:cover;"
      />
      <div class="card-body">
        <div class="info">
        <h5 class="card-title">${m.title}</h5>
        <p class="card-text">${m.release_date}</p>
        </div>
        <div class="d-grid gap-2">
          <button
            class="btn rounded-pill modal-detail-button btn-yellow"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            type="button"
            data-movieid="${m.id}"
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  </div>`
}

function showMovieDetails(m) {
  return `<div class="row g-0">
    <div class="col-md-4">
      <img
        src="https://image.tmdb.org/t/p/w500${m.poster_path}"
        class="img-fluid rounded-start"
        alt="..."
      />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h4 class="card-title">${m.title} (${m.release_date})</h4>
        <h5>Language : ${m.original_language}</h5>
        <h5>Rate : ${m.vote_average}</h5>
        <a href="${m.homepage}"><p>${m.homepage}</p></a>
        <p align="justify" class="card-text">Plot : ${m.overview}</p>
      </div>
    </div>
  </div>`
}