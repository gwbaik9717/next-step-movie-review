import Api from "../../src/js/domain/Api";
import App from "../../src/js/domain/App";
import MovieListModel from "../../src/js/domain/MovieListModel";

describe("앱 기능 테스트", async () => {
  const searchQuery = "Harry Potter";

  beforeEach(() => {
    cy.interceptGetPopularMovies(1);
    cy.interceptSearchMovies(searchQuery, 1);
  });

  it("앱 초기화시 영화 목록의 첫번째 페이지를 비동기 통신(TMDB 인기순 api)으로 불러온다.", async () => {
    const app = new App();
    const movieList = new MovieListModel();

    await app.init(movieList);

    expect(movieList.movies).to.have.length(Api.NUM_MOVIES_PER_PAGE);
  });

  it("첫번째 페이지의 영화 목록을 모두 불러온 상태일때 두번째 페이지의 영화 목록을 불러오면, currentPage와 movies 가 갱신된다.", async () => {
    const nextPage = 2;
    const app = new App();
    const movieList = new MovieListModel();

    // 첫번째 페이지의 영화 목록을 불러온다.
    await app.init(movieList);

    cy.interceptGetPopularMovies(2);

    // 두번째 페이지의 영화 목록을 불러온다.
    await app.fetchNextPage(movieList);

    expect(app.currentPage).to.equal(nextPage);
    expect(movieList.movies).to.have.length(Api.NUM_MOVIES_PER_PAGE * nextPage);
  });

  it("영화 검색 결과를 불러오면 기존 페이지에 대한 정보를 초기화 한다.", async () => {
    const app = new App();
    const movieList = new MovieListModel();
    await app.init(movieList);

    // 두번째 페이지의 영화 목록을 불러온다.
    await app.fetchNextPage(movieList);

    // 영화 검색
    app.searchQuery = searchQuery;
    await app.searchMovies(movieList);

    expect(app.currentPage).to.equal(1);
    expect(movieList.movies).to.have.length.within(0, Api.NUM_MOVIES_PER_PAGE);
  });

  it("빈 스트링을 검색하면 페이지 정보가 초기화되고, 영화 인기 목록으로 영화 목록을 overwrite 한다.", async () => {
    cy.interceptGetPopularMovies(2);
    cy.interceptSearchMovies("", 1);

    const app = new App();
    const movieList = new MovieListModel();
    await app.init(movieList);

    // 두번째 페이지의 영화 목록을 불러온다.
    await app.fetchNextPage(movieList);

    // 영화 검색
    app.searchQuery = "";
    await app.searchMovies(movieList);

    expect(app.currentPage).to.equal(1);
    expect(movieList.movies).to.have.length(Api.NUM_MOVIES_PER_PAGE);
  });
});
