import { Method, RouteHandler } from "cypress/types/net-stubbing";
import Api from "../../src/js/domain/Api";
import { Page } from "../types";
import ApiClient from "../../src/js/domain/ApiClient";

Cypress.Commands.add("interceptGetEmptyPopularMovies", (page: Page) => {
  return cy.interceptRequest(
    "GET",
    Api.generatePopularMoviesUrl(page),
    (req) => {
      req.continue((res) => {
        res.send({ results: [] });
      });
    }
  );
});

Cypress.Commands.add("interceptGetPopularMovies", (page: Page) => {
  return cy.interceptRequest("GET", Api.generatePopularMoviesUrl(page), {
    delay: 2000,
    fixture: `movieListPage${page}.json`,
  });
});

Cypress.Commands.add("interceptGetMovieDetail", (movieId: number) => {
  return cy.interceptRequest("GET", Api.generateMovieDetailUrl(movieId), {
    delay: 2000,
    fixture: "movieDetail.json",
  });
});

Cypress.Commands.add("interceptSearchMovies", (query: string, page: Page) => {
  return cy.interceptRequest("GET", Api.generateSearchMoviesUrl(query, page), {
    delay: 2000,
    fixture: "movieListSearchResult.json",
  });
});

Cypress.Commands.add("interceptGetMovieUserRatingExists", (movieId: number) => {
  return cy.interceptRequest(
    "GET",
    Api.generateMovieUserRatingUrl(Number(movieId)),
    {
      delay: 2000,
      fixture: "movieUserRatingExists.json",
    }
  );
});

Cypress.Commands.add(
  "interceptGetMovieUserRatingNotExists",
  (movieId: number) => {
    return cy.interceptRequest(
      "GET",
      Api.generateMovieUserRatingUrl(Number(movieId)),
      {
        delay: 2000,
        fixture: "movieUserRatingNonExists.json",
      }
    );
  }
);

Cypress.Commands.add("interceptPostUserRating", (movieId: number) => {
  return cy.interceptRequest(
    "POST",
    Api.generatePostMovieUserRatingUrl(movieId),
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
  return cy.interceptRequest(
    "POST",
    Api.generatePostMovieUserRatingUrl(movieId),
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
  "interceptRequest",
  (method: Method, endpoint: string, response?: RouteHandler) => {
    return cy.intercept(method, Cypress.env("BASE_URL") + endpoint, response);
  }
);

Cypress.Commands.add(
  "requestApi",
  (method: Method, endpoint: string, body?: unknown) => {
    return cy.request({
      method,
      url: `${Cypress.env("BASE_URL")}${endpoint}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${ApiClient.API_ACCESS_TOKEN}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }
);
