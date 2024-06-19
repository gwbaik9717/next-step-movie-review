import "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      interceptGetEmptyPopularMovies(page: number): void;
    }

    interface Chainable {
      interceptGetPopularMovies(page: number): void;
    }

    interface Chainable {
      interceptGetMovieDetail(movieId: number): void;
    }

    interface Chainable {
      interceptSearchMovies(query: string, page: number): void;
    }

    interface Chainable {
      interceptGetMovieUserRatingExists(movieId: number): void;
    }

    interface Chainable {
      interceptGetMovieUserRatingNotExists(movieId: number): void;
    }

    interface Chainable {
      interceptPostUserRating(movieId: number): void;
    }
  }
}

const selectors = {
  itemCard: ".item-card",
  modal: ".modal",
  modalCloseBtn: ".modal-close",
  movieTitle: ".movie-title",
  movieHeader: ".movie-header",
  movieOverview: ".movie-overview",
  movieThumbnail: ".movie-thumbnail",
  skeleton: ".skeleton",
};

export { selectors };
