import Api from "../../src/js/domain/Api";
import { Page } from "../types";

Cypress.Commands.add("interceptGetEmptyPopularMovies", (page: Page) => {
  cy.intercept(Api.generatePopularMoviesUrl(page), (req) => {
    req.continue((res) => {
      res.send({ results: [] });
    });
  }).as("getPopularMovies");
});

Cypress.Commands.add("interceptGetPopularMovies", (page: Page) => {
  cy.intercept("GET", Api.generatePopularMoviesUrl(page), {
    delay: 2000,
    fixture: `movieListPage${page}.json`,
  }).as("getPopularMovies");
});

Cypress.Commands.add("interceptGetMovieDetail", (movieId: number) => {
  cy.intercept("GET", Api.generateMovieDetailUrl(Number(movieId)), {
    delay: 2000,
    fixture: "movieDetail.json",
  }).as("getMovieDetail");
});

Cypress.Commands.add("interceptSearchMovies", (query: string, page: Page) => {
  cy.intercept("GET", Api.generateSearchMoviesUrl(query, page), {
    delay: 2000,
    fixture: "movieListSearchResult.json",
  }).as("searchMovies");
});

Cypress.Commands.add("interceptGetMovieUserRatingExists", (movieId: number) => {
  cy.intercept("GET", Api.generateMovieUserRatingUrl(Number(movieId)), {
    delay: 2000,
    fixture: "movieUserRatingExists.json",
  }).as("getUserRating");
});

Cypress.Commands.add(
  "interceptGetMovieUserRatingNotExists",
  (movieId: number) => {
    cy.intercept("GET", Api.generateMovieUserRatingUrl(Number(movieId)), {
      delay: 2000,
      fixture: "movieUserRatingNonExists.json",
    }).as("getUserRating");
  }
);

Cypress.Commands.add("interceptPostUserRating", (movieId: number) => {
  cy.intercept("POST", Api.generatePostMovieUserRatingUrl(movieId), (req) => {
    req.reply((res) => {
      expect(req.body).to.have.property("value", 2);
      res.send({
        statusCode: 200,
        body: {},
      });
    });
  }).as("postUserRating");
});

Cypress.Commands.add("interceptPostUserRatingFail", (movieId: number) => {
  cy.intercept("POST", Api.generatePostMovieUserRatingUrl(movieId), (req) => {
    req.reply((res) => {
      res.send({
        statusCode: 500,
        body: {},
      });
    });
  }).as("postUserRating");
});
