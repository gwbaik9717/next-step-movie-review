import Api from "./Api.js";
import Movie from "./Movie.js";
class MovieList {
  #movies;

  constructor() {
    this.#movies = [];
  }

  get movies() {
    return [...this.#movies];
  }

  addMovie(movie) {
    this.#movies.push(movie);
  }

  async fetchMovies(page) {
    const movieUrl = Api.generateUrl(page);

    try {
      const { results: movies } = await Api.get(movieUrl);

      movies.forEach((movie) => {
        this.addMovie(
          new Movie({
            title: movie.title,
            thumbnail: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
            rating: movie.vote_average,
          })
        );
      });
    } catch (e) {
      alert(e.message);
    }
  }
}

export default MovieList;