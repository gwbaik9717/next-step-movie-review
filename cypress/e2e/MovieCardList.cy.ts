import { selectors } from "../../cypress/support/index";

describe("영화 카드 목록 기능 테스트", () => {
  beforeEach(() => {
    cy.interceptGetPopularMovies(1).as("getPopularMovies");
    cy.visit("http://localhost:8080/");
    cy.wait("@getPopularMovies");
  });

  it("앱 최초 로드시 n개의 영화 카드가 보여야 한다.", () => {
    cy.fixture("movieListPage1.json").then(({ results }) => {
      cy.get(selectors.itemCard).should("have.length", results.length);
    });
  });

  it("더보기 버튼을 클릭하면 m개의 영화 카드가 추가로 보여야 한다.", () => {
    cy.interceptGetPopularMovies(2);

    cy.fixture("movieListPage1.json").then(({ results: page1 }) => {
      cy.fixture("movieListPage2.json").then(({ results: page2 }) => {
        const totalMovies = page1.length + page2.length;

        // fetch next page
        cy.get(selectors.showMore).click();

        cy.get(selectors.itemCard).should("have.length", totalMovies);
      });
    });
  });

  it("로딩 중일 때 스켈레톤 카드가 보인다.", () => {
    cy.interceptGetPopularMovies(2).as("getPopularMovies");

    // fetch next page
    cy.get(selectors.showMore).click();

    cy.get(selectors.skeletonCard).should("be.visible");
    cy.wait("@getPopularMovies");
    cy.get(selectors.skeletonCard).should("not.exist");
  });

  it("영화 카드가 20개 미만이면 더보기 버튼이 보이지 않아야 한다.", () => {
    cy.interceptGetEmptyPopularMovies(2).as("getPopularMovies");

    // fetch next page
    cy.get(selectors.showMore).click();

    cy.wait("@getPopularMovies");
    cy.get(selectors.showMore).should("not.be.visible");
  });
});
