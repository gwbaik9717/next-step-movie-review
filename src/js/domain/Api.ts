import {
  MovieDetailResponseDTO,
  MovieUserRatingRequestDTO,
  MovieUserRatingResponseDTO,
  PopularMovieListResponseDTO,
} from "../../types/MovieApiDTO";
import ErrorMessage from "../ErrorMessage";
import ApiClient from "./ApiClient";
import ApiError from "./ApiError";

const Api = {
  THUMBNAIL_URL: "https://image.tmdb.org/t/p/w500",
  LANGUAGE: "ko-KR",
  NUM_MOVIES_PER_PAGE: 20,

  generatePopularMoviesUrl(page: number): string {
    const param = new URLSearchParams({
      language: this.LANGUAGE,
      page: page.toString(),
    });

    return `/movie/popular?${param}`;
  },

  generateSearchMoviesUrl(query: string, page: number): string {
    const param = new URLSearchParams({
      language: this.LANGUAGE,
      query,
      page: page.toString(),
    });

    return `/search/movie?${param}`;
  },

  generateMovieDetailUrl(movieId: number): string {
    const param = new URLSearchParams({
      language: this.LANGUAGE,
    });

    return `/movie/${movieId}?${param}`;
  },

  generateMovieUserRatingUrl(movieId: number): string {
    return `/movie/${movieId}/account_states`;
  },

  generatePostMovieUserRatingUrl(movieId: number): string {
    return `/movie/${movieId}/rating`;
  },

  async getMovieDetail(movieId: number) {
    const endpoint = this.generateMovieDetailUrl(movieId);

    try {
      const { genres } = await ApiClient.get<MovieDetailResponseDTO>(endpoint);

      return genres;
    } catch (e: unknown) {
      console.error(e);

      // if e is number
      if (typeof e === "number") {
        switch (e) {
          case 401:
            throw Error(ErrorMessage.UNAUTHORIZED);
          case 404:
            throw Error(ErrorMessage.NOT_VALID_URL);
          case 500:
            throw Error(ErrorMessage.INTERNAL_SERVER_ERROR);
          default:
            throw Error(ErrorMessage.DEFAULT);
        }
      }

      throw e;
    }
  },

  async getMovieUserRating(movieId: number) {
    const endpoint = Api.generateMovieUserRatingUrl(movieId);

    try {
      const { rated } = await ApiClient.get<MovieUserRatingResponseDTO>(
        endpoint
      );

      return rated;
    } catch (e: unknown) {
      console.error(e);

      // if e is number
      if (typeof e === "number") {
        switch (e) {
          case 401:
            throw Error(ErrorMessage.UNAUTHORIZED);
          case 404:
            throw Error(ErrorMessage.NOT_VALID_URL);
          case 500:
            throw Error(ErrorMessage.INTERNAL_SERVER_ERROR);
          default:
            throw Error(ErrorMessage.DEFAULT);
        }
      }

      throw e;
    }
  },

  async postMovieUserRating(movieId: number, rating: number) {
    const url = this.generatePostMovieUserRatingUrl(movieId);

    try {
      await ApiClient.post<MovieUserRatingRequestDTO>(url, {
        value: rating,
      });
    } catch (e) {
      console.error(e);

      // if e is number
      if (typeof e === "number") {
        switch (e) {
          case 401:
            throw Error(ErrorMessage.UNAUTHORIZED);
          case 404:
            throw Error(ErrorMessage.NOT_VALID_URL);
          case 500:
            throw Error(ErrorMessage.INTERNAL_SERVER_ERROR);
          default:
            throw Error(ErrorMessage.DEFAULT);
        }
      }

      throw e;
    }
  },

  async getMovies(page: number) {
    const movieUrl = Api.generatePopularMoviesUrl(page);

    try {
      const { results: movies } = await ApiClient.get<{
        results: PopularMovieListResponseDTO[];
      }>(movieUrl);

      return movies;
    } catch (e) {
      console.error(e);

      // if e is number
      if (typeof e === "number") {
        switch (e) {
          case 401:
            throw Error(ErrorMessage.UNAUTHORIZED);
          case 404:
            throw Error(ErrorMessage.NOT_VALID_URL);
          case 500:
            throw Error(ErrorMessage.INTERNAL_SERVER_ERROR);
          default:
            throw Error(ErrorMessage.DEFAULT);
        }
      }

      throw e;
    }
  },

  async searchMovies(query: string, page: number) {
    const searchUrl = Api.generateSearchMoviesUrl(query, page);

    try {
      const { results: movies } = await ApiClient.get<{
        results: PopularMovieListResponseDTO[];
      }>(searchUrl);

      return movies;
    } catch (e) {
      console.error(e);

      // if e is number
      if (typeof e === "number") {
        switch (e) {
          case 401:
            throw Error(ErrorMessage.UNAUTHORIZED);
          case 404:
            throw Error(ErrorMessage.NOT_VALID_URL);
          case 500:
            throw Error(ErrorMessage.INTERNAL_SERVER_ERROR);
          default:
            throw Error(ErrorMessage.DEFAULT);
        }
      }

      throw e;
    }
  },
};

export default Api;
