import App from "../../src/js/domain/App";
import MovieListModel from "../../src/js/domain/MovieListModel";

describe("앱 기능 테스트", async () => {
  const searchQuery = "Harry Potter";

  beforeEach(() => {
    cy.interceptGetPopularMovies(1);
    cy.interceptSearchMovies(searchQuery, 1);
  });

  it("앱 초기화시 영화 목록의 첫번째 페이지를 비동기 통신(TMDB 인기순 api)으로 불러온다.", () => {
    const app = new App();
    const movieList = new MovieListModel();

    cy.wrap(app.init(movieList)).then(() => {
      cy.fixture("movieListPage1.json").then(({ results }) => {
        expect(movieList.movies).to.have.length(results.length);
      });
    });
  });

  it("첫번째 페이지의 영화 목록을 모두 불러온 상태일때 두번째 페이지의 영화 목록을 불러오면, currentPage와 movies 가 갱신된다.", () => {
    const app = new App();
    const movieList = new MovieListModel();

    cy.wrap(app.init(movieList)).then(() => {
      cy.interceptGetPopularMovies(2);
      const nextPage = 2;
      cy.wrap(app.fetchNextPage(movieList)).then(() => {
        expect(app.currentPage).to.equal(nextPage);

        cy.fixture("movieListPage1.json").then(({ results: page1 }) => {
          cy.fixture("movieListPage2.json").then(({ results: page2 }) => {
            const totalMovies = page1.length + page2.length;
            expect(movieList.movies).to.have.length(totalMovies);
          });
        });
      });
    });
  });

  it("영화 검색 결과를 불러오면 기존 페이지에 대한 정보를 초기화한다.", () => {
    const app = new App();
    const movieList = new MovieListModel();

    cy.wrap(app.init(movieList)).then(() => {
      cy.interceptGetPopularMovies(2);

      cy.wrap(app.fetchNextPage(movieList)).then(() => {
        app.searchQuery = searchQuery;
        cy.wrap(app.searchMovies(movieList)).then(() => {
          expect(app.currentPage).to.equal(1);

          cy.fixture("movieListSearchResult.json").then(({ results }) => {
            expect(movieList.movies).to.have.length(results.length);
          });
        });
      });
    });
  });

  it("빈 스트링을 검색하면 페이지 정보가 초기화되고, 영화 인기 목록으로 영화 목록을 overwrite 한다.", () => {
    const app = new App();
    const movieList = new MovieListModel();

    cy.wrap(app.init(movieList)).then(() => {
      app.searchQuery = searchQuery;
      cy.wrap(app.searchMovies(movieList)).then(() => {
        app.searchQuery = "";
        cy.wrap(app.searchMovies(movieList)).then(() => {
          expect(app.currentPage).to.equal(1);

          cy.fixture("movieListPage1.json").then(({ results }) => {
            expect(movieList.movies).to.have.length(results.length);
          });
        });
      });
    });
  });
});
