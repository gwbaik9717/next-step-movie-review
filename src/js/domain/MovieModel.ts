import {
  MovieDetailResponseDTO,
  MovieUserRatingRequestDTO,
  MovieUserRatingResponseDTO,
} from "../../types/MovieApiDTO";
import Api from "./Api";

class MovieModel {
  #id: number;
  #title: string;
  #rating: number;
  #thumbnail: string;
  #overview: string;
  userRating: null | number = null; // 사용자가 평가한 평점
  genres: string[] = [];

  constructor({
    id,
    title,
    rating,
    thumbnail,
    overview,
  }: {
    id: number;
    title: string;
    rating: number;
    thumbnail: string;
    overview: string;
  }) {
    this.#id = id;
    this.#title = title;
    this.#rating = rating;
    this.#thumbnail = thumbnail;
    this.#overview = overview;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get rating() {
    return this.#rating;
  }

  get thumbnail() {
    return this.#thumbnail;
  }

  get overview() {
    return this.#overview;
  }

  async fetchMovieDetail() {
    const url = Api.generateMovieDetailUrl(this.#id);

    try {
      const { genres } = await Api.get<MovieDetailResponseDTO>(url);

      this.genres = genres.map((genre) => genre.name);
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  }

  async fetchMovieUserRating() {
    const url = Api.generateMovieUserRatingUrl(this.#id);

    try {
      const { rated } = await Api.get<MovieUserRatingResponseDTO>(url);

      if (!rated) {
        return;
      }

      this.userRating = rated.value;
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  }

  async postMovieUserRating(rating: number) {
    const url = Api.generatePostMovieUserRatingUrl(this.#id);

    try {
      await Api.post<MovieUserRatingRequestDTO, unknown>(url, {
        value: rating,
      });

      this.userRating = rating;
    } catch (e) {
      throw e;
    }
  }
}

export default MovieModel;
