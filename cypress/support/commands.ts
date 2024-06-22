import Api from "../../src/js/domain/Api";
import { Page } from "../types";

Cypress.Commands.add("interceptGetEmptyPopularMovies", (page: Page) => {
  return cy.intercept(
    Cypress.env("BASE_URL") + Api.generatePopularMoviesUrl(page),
    (req) => {
      req.continue((res) => {
        res.send({ results: [] });
      });
    }
  );
});

Cypress.Commands.add("interceptGetPopularMovies", (page: Page) => {
  return cy.intercept(
    "GET",
    Cypress.env("BASE_URL") + Api.generatePopularMoviesUrl(page),
    {
      delay: 1000,
      fixture: `movieListPage${page}.json`,
    }
  );
});

Cypress.Commands.add("interceptGetMovieDetail", (movieId: number) => {
  return cy.intercept(
    "GET",
    Cypress.env("BASE_URL") + Api.generateMovieDetailUrl(Number(movieId)),
    {
      delay: 1000,
      fixture: "movieDetail.json",
    }
  );
});

Cypress.Commands.add("interceptSearchMovies", (query: string, page: Page) => {
  return cy.intercept(
    "GET",
    Cypress.env("BASE_URL") + Api.generateSearchMoviesUrl(query, page),
    {
      delay: 1000,
      fixture: "movieListSearchResult.json",
    }
  );
});

Cypress.Commands.add("interceptGetMovieUserRatingExists", (movieId: number) => {
  return cy.intercept(
    "GET",
    Cypress.env("BASE_URL") + Api.generateMovieUserRatingUrl(Number(movieId)),
    {
      delay: 1000,
      fixture: "movieUserRatingExists.json",
    }
  );
});

Cypress.Commands.add(
  "interceptGetMovieUserRatingNotExists",
  (movieId: number) => {
    return cy.intercept(
      "GET",
      Cypress.env("BASE_URL") + Api.generateMovieUserRatingUrl(Number(movieId)),
      {
        delay: 1000,
        fixture: "movieUserRatingNonExists.json",
      }
    );
  }
);

Cypress.Commands.add("interceptPostUserRating", (movieId: number) => {
  return cy.intercept(
    "POST",
    Cypress.env("BASE_URL") + Api.generatePostMovieUserRatingUrl(movieId),
    (req) => {
      req.reply((res) => {
        expect(req.body).to.have.property("value", 2);
        res.send({
          statusCode: 200,
          body: {},
        });
      });
    }
  );
});

Cypress.Commands.add("interceptPostUserRatingFail", (movieId: number) => {
  return cy.intercept(
    "POST",
    Cypress.env("BASE_URL") + Api.generatePostMovieUserRatingUrl(movieId),
    (req) => {
      req.reply((res) => {
        res.send({
          statusCode: 500,
          body: {},
        });
      });
    }
  );
});

Cypress.Commands.add(
  "requestApi",
  (method: string, endpoint: string, body?: unknown) => {
    return cy.request({
      method,
      url: `${Cypress.env("BASE_URL")}${endpoint}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${Api.API_ACCESS_TOKEN}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }
);
