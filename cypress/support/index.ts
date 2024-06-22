import { Method, RouteHandler } from "cypress/types/net-stubbing";
import { Page } from "../types";
import "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      interceptGetEmptyPopularMovies(page: Page): Chainable;
    }

    interface Chainable {
      interceptGetPopularMovies(page: Page): Chainable;
    }

    interface Chainable {
      interceptGetMovieDetail(movieId: number): Chainable;
    }

    interface Chainable {
      interceptSearchMovies(query: string, page: Page): Chainable;
    }

    interface Chainable {
      interceptGetMovieUserRatingExists(movieId: number): Chainable;
    }

    interface Chainable {
      interceptGetMovieUserRatingNotExists(movieId: number): Chainable;
    }

    interface Chainable {
      interceptPostUserRating(movieId: number): Chainable;
    }

    interface Chainable {
      interceptPostUserRatingFail(movieId: number): Chainable;
    }

    interface Chainable {
      interceptRequest(
        method: Method,
        endpoint: string,
        response?: RouteHandler
      ): Chainable;
    }

    interface Chainable {
      requestApi(method: Method, endpoint: string, body?: unknown): Chainable;
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
