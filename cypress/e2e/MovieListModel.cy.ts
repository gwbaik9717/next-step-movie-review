import MovieListModel from "../../src/js/domain/MovieListModel";

describe("영화 목록 기능 테스트", () => {
  const searchQuery = "Harry Potter";

  beforeEach(() => {
    cy.interceptGetPopularMovies(1);
    cy.interceptSearchMovies(searchQuery, 1);
  });

  it("영화 목록 API를 호출하고 영화 목록을 저장한다.", async () => {
    const currentPage = 1;
    const movieList = new MovieListModel();

    await movieList.fetchMovies(currentPage);

    cy.fixture("movieListPage1.json").then(({ results }) => {
      expect(movieList.movies).to.have.length(results.length);
    });
  });

  it("영화 검색 API를 호출하고 검색된 영화 목록을 저장한다.", async () => {
    const page = 1;
    const movieList = new MovieListModel();

    await movieList.searchMovies(searchQuery, page);

    cy.fixture("movieListSearchResult.json").then(({ results }) => {
      expect(movieList.movies).to.have.length(results.length);
    });
  });
});
