import { Page } from "../types";
import "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      interceptGetEmptyPopularMovies(page: Page): void;
    }

    interface Chainable {
      interceptGetPopularMovies(page: Page): void;
    }

    interface Chainable {
      interceptGetMovieDetail(movieId: number): void;
    }

    interface Chainable {
      interceptSearchMovies(query: string, page: Page): void;
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

    interface Chainable {
      interceptPostUserRatingFail(movieId: number): void;
    }
  }
}

const selectors = {
  itemCard: ".item-card",
  movieTitle: ".movie-title",
  movieHeader: ".movie-header",
  movieOverview: ".movie-overview",
  movieThumbnail: ".movie-thumbnail",
  showMore: ".show-more",
  skeleton: ".skeleton",
  skeletonCard: ".skeleton-card",
  searchInput: ".search-input",
  searchButton: ".search-button",
  modal: ".modal",
  modalCloseBtn: ".modal-close",
  modalBody: ".modal-body",
  userRating: ".user-rating",
  ratingStar: ".rating-star",
  ratingScore: ".rating-score",
};

export { selectors };
