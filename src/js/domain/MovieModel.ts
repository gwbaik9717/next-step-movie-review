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
    try {
      const genres = await Api.getMovieDetail(this.#id);

      if (!genres) {
        return;
      }

      this.genres = genres.map((genre) => genre.name);
    } catch (e) {
      throw e;
    }
  }

  async fetchMovieUserRating() {
    try {
      const rated = await Api.getMovieUserRating(this.#id);

      if (!rated) {
        return;
      }

      this.userRating = rated.value;
    } catch (e) {
      throw e;
    }
  }

  async postMovieUserRating(rating: number) {
    const prevUserRating = this.userRating;

    try {
      // optimistic update
      this.userRating = rating;
      await Api.postMovieUserRating(this.#id, rating);
    } catch (e) {
      // rollback userRating
      this.userRating = prevUserRating;
      throw e;
    }
  }
}

export default MovieModel;
