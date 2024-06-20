import MovieModel from "../../src/js/domain/MovieModel";
import {
  MovieDetailResponseDTO,
  MovieUserRatingResponseDTO,
} from "../../src/types/MovieApiDTO";

describe("영화 기능 테스트", () => {
  const movieId = 653346;
  const movie = new MovieModel({
    id: movieId,
    title: "테스트",
    rating: 5,
    thumbnail: "test.jpg",
    overview: "",
  });

  beforeEach(() => {
    cy.interceptGetMovieUserRatingExists(movieId);
    cy.interceptGetMovieDetail(movieId);
    cy.interceptPostUserRating(movieId);
  });

  it("영화는 id, 썸네일, 제목, 평점, overview 로 이루어져있다.", () => {
    expect(movie.id).to.equal(movieId);
    expect(movie.title).to.equal("테스트");
    expect(movie.rating).to.equal(5);
    expect(movie.thumbnail).to.equal("test.jpg");
    expect(movie.overview).to.equal("");
  });

  it("영화 상세 정보 API를 호출하고 영화 상세 정보 중 genre 를 movie 에 추가한다.", async () => {
    cy.fixture<MovieDetailResponseDTO>("movieDetail.json").then(
      async (movieDetail) => {
        const genres = movieDetail.genres;

        await movie.fetchMovieDetail();
        expect(movie.genres).to.deep.equals(genres.map((genre) => genre.name));
      }
    );
  });

  it("사용자가 평가한 평점을 가져오는 API를 호출하고 만약 이미 평가한 이력이 있다면 userRating 에 저장한다.", async () => {
    cy.fixture<MovieUserRatingResponseDTO>("movieUserRatingExists.json").then(
      async (movieUserRating) => {
        const userRating = movieUserRating.rated;

        if (userRating) {
          await movie.fetchMovieUserRating();
          expect(movie.userRating).to.equal(userRating);
        }
      }
    );
  });

  it("사용자가 평가한 평점을 가져오는 API를 호출하고 만약 평가한 이력이 없다면 userRating 는 null 이다.", async () => {
    cy.interceptGetMovieUserRatingNotExists(movieId);

    cy.fixture<MovieUserRatingResponseDTO>(
      "movieUserRatingNonExists.json"
    ).then(async (movieUserRating) => {
      const userRating = movieUserRating.rated;

      if (!userRating) {
        await movie.fetchMovieUserRating();
        expect(movie.userRating).to.be.null;
      }
    });
  });

  it("사용자가 영화를 평가하는 API를 호출하고 userRating 에 저장한다.", async () => {
    const userRating = 4.5;

    await movie.postMovieUserRating(userRating);
    expect(movie.userRating).to.equal(userRating);
  });
});
