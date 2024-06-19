import Api from "../../src/js/domain/Api";

Cypress.Commands.add("interceptGetEmptyPopularMovies", (page: number) => {
  cy.intercept(Api.generatePopularMoviesUrl(page), (req) => {
    req.continue((res) => {
      res.send({ results: [] });
    });
  }).as("getPopularMovies");
});

Cypress.Commands.add("interceptGetPopularMovies", (page: number) => {
  cy.intercept("GET", Api.generatePopularMoviesUrl(page), {
    delay: 1000,
    fixture: `movieListPage${page}.json`,
  }).as("getPopularMovies");
});

Cypress.Commands.add("interceptGetMovieDetail", (movieId: number) => {
  cy.intercept("GET", Api.generateMovieDetailUrl(Number(movieId)), {
    delay: 1000,
    fixture: "movieDetail.json",
  }).as("getMovieDetail");
});

Cypress.Commands.add("interceptSearchMovies", (query: string, page: number) => {
  cy.intercept("GET", Api.generateSearchMoviesUrl(query, page), {
    fixture: "movieListSearchResult.json",
  }).as("searchMovies");
});

Cypress.Commands.add("interceptGetMovieUserRatingExists", (movieId: number) => {
  cy.intercept("GET", Api.generateMovieUserRatingUrl(Number(movieId)), {
    delay: 1000,
    fixture: "movieUserRatingExists.json",
  }).as("getUserRating");
});

Cypress.Commands.add(
  "interceptGetMovieUserRatingNotExists",
  (movieId: number) => {
    cy.intercept("GET", Api.generateMovieUserRatingUrl(Number(movieId)), {
      delay: 1000,
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
