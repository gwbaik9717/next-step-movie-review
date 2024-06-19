const selectors = {
  "item-card": ".item-card",
  "show-more": ".show-more",
  "skeleton-card": ".skeleton-card",
};

describe("영화 카드 목록 기능 테스트", () => {
  beforeEach(() => {
    cy.interceptGetPopularMovies(1);
    cy.visit("http://localhost:8080/");
    cy.wait("@getPopularMovies");
  });

  it("앱 최초 로드시 20개의 영화 카드가 보여야 한다.", () => {
    cy.get(selectors["item-card"]).should("have.length", 20);
  });

  it("더보기 버튼을 클릭하면 20개의 영화 카드가 추가로 보여야 한다.", () => {
    cy.get(selectors["show-more"]).click();
    cy.get(selectors["item-card"]).should("have.length", 40);
  });

  it("로딩 중일 때 스켈레톤 카드가 보인다.", () => {
    cy.interceptGetPopularMovies(2);

    // fetch next page
    cy.get(selectors["show-more"]).click();

    cy.get(selectors["skeleton-card"]).should("be.visible");
    cy.wait("@getPopularMovies");
    cy.get(selectors["skeleton-card"]).should("not.exist");
  });

  it("영화 카드가 20개 미만이면 더보기 버튼이 보이지 않아야 한다.", () => {
    cy.interceptGetEmptyPopularMovies(2);
    cy.get(selectors["show-more"]).click();
    cy.wait("@getPopularMovies");
    cy.get(selectors["show-more"]).should("not.be.visible");
  });
});
