import Api from "../../src/js/domain/Api";

describe("Api 기능 테스트", () => {
  it("영화 목록 API를 호출하면 20개씩 목록에 나타나야 한다.", () => {
    const currentPage = 1;
    const endpoint = Api.generatePopularMoviesUrl(currentPage);

    cy.requestApi("GET", endpoint).as("getMovies");

    cy.get("@getMovies").its("status").should("eq", 200);
    cy.get("@getMovies")
      .its("body.results")
      .should("have.length", Api.NUM_MOVIES_PER_PAGE);
  });

  it("영화 검색 API를 호출하면 검색 결과를 반환한다.", () => {
    const query = "Harry Potter";
    const currentPage = 1;
    const endpoint = Api.generateSearchMoviesUrl(query, currentPage);

    cy.requestApi("GET", endpoint).as("getMovies");

    cy.get("@getMovies").its("status").should("eq", 200);
    cy.get("@getMovies").its("body.results").should("not.be.empty");
  });

  it("영화 상세 정보 API를 호출하면 상세 정보를 반환한다.", () => {
    const movieId = 929590;
    const endpoint = Api.generateMovieDetailUrl(movieId);

    cy.requestApi("GET", endpoint).as("getMovieDetail");

    cy.get("@getMovieDetail").its("status").should("eq", 200);
    cy.get("@getMovieDetail").its("body").should("not.be.empty");
  });

  it("사용자가 평가한 영화 정보 API를 호출하면 사용자의 평가 정보를 반환한다.", () => {
    const movieId = 929590;
    const endpoint = Api.generateMovieUserRatingUrl(movieId);

    cy.requestApi("GET", endpoint).as("getUserRating");

    cy.get("@getUserRating").its("status").should("eq", 200);
    cy.get("@getUserRating").its("body").should("not.be.empty");
  });

  it("사용자가 영화를 평가하는 API를 호출하면 성공 메시지를 반환한다.", () => {
    const movieId = 929590;
    const endpoint = Api.generatePostMovieUserRatingUrl(movieId);
    const moiveUserRating = 8.5;

    cy.requestApi("POST", endpoint, { value: moiveUserRating }).as(
      "postUserRating"
    );

    cy.get("@postUserRating").its("status").should("eq", 201);
    cy.get("@postUserRating").its("body").should("not.be.empty");
  });
});
