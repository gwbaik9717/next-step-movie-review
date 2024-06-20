import { selectors } from "../../cypress/support/index";

describe("검색창 기능 테스트", () => {
  const query = "Harry Potter";

  beforeEach(() => {
    cy.interceptGetPopularMovies(1);
    cy.interceptSearchMovies(query, 1);
    cy.visit("http://localhost:8080/");
    cy.wait("@getPopularMovies");
  });

  it("검색어를 입력하면 input 의 value 값이 바뀐다.", () => {
    cy.get(selectors.searchInput).type(query).should("have.value", query);
  });

  it("검색할 query 를 입력 후 검색 버튼을 클릭하면 스켈레톤이 보이고 검색결과가 나타난다.", () => {
    cy.get(selectors.searchInput).type(query);
    cy.get(selectors.searchButton).click();
    cy.get(selectors.skeletonCard).should("be.visible");
    cy.wait("@searchMovies");
    cy.get(selectors.skeletonCard).should("not.exist");
    cy.fixture("movieListSearchResult.json").then(({ results }) => {
      cy.get(selectors.itemCard).should("have.length", results.length);
    });
  });

  it("검색할 query 를 입력 후 엔터키를 누르면 스켈레톤이 보이고 검색결과가 나타난다.", () => {
    cy.get(selectors.searchInput).type(query).type("{enter}");

    cy.get(selectors.skeletonCard).should("be.visible");
    cy.wait("@searchMovies");
    cy.get(selectors.skeletonCard).should("not.exist");
    cy.fixture("movieListSearchResult.json").then(({ results }) => {
      cy.get(selectors.itemCard).should("have.length", results.length);
    });
  });

  it("empty string 을 입력 후 검색하면 검색 결과가 초기화되고 인기 영화 목록이 보인다.", () => {
    cy.get(selectors.searchInput).type(query);
    cy.get(selectors.searchButton).click();
    cy.wait("@searchMovies");

    // empty string 입력 및 검색
    cy.get(selectors.searchInput).clear();
    cy.get(selectors.searchButton).click();
    cy.get(selectors.skeletonCard).should("be.visible");
    cy.wait("@getPopularMovies");
    cy.get(selectors.skeletonCard).should("not.exist");

    // 인기 영화 목록이 보여야 한다.
    cy.fixture("movieListPage1.json").then(({ results }) => {
      cy.get(selectors.itemCard).should("have.length", results.length);
    });
  });
});
