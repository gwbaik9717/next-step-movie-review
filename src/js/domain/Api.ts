import ErrorMessage from "../ErrorMessage";

const Api = {
  API_KEY: window.Cypress
    ? Cypress.env("TMDB_API_KEY")
    : process.env.TMDB_API_KEY,
  API_ACCESS_TOKEN: window.Cypress
    ? Cypress.env("TMDB_API_ACCESS_TOKEN")
    : process.env.TMDB_API_ACCESS_TOKEN,
  BASE_URL: "https://api.themoviedb.org/3",
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

  throwError(status: number) {
    switch (status) {
      case 401:
        throw new Error(ErrorMessage.NOT_VALID_API_KEY);
      case 404:
        throw new Error(ErrorMessage.NOT_VALID_URL);
      default:
        throw new Error(ErrorMessage.DEFAULT);
    }
  },

  async get<T>(endpoint: string): Promise<T> {
    return await this.request<T>("GET", endpoint);
  },

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    return await this.request<T>("POST", endpoint, body);
  },

  async request<T>(
    method: string,
    endpoint: string,
    body?: unknown
  ): Promise<T> {
    const url = `${this.BASE_URL}${endpoint}`;

    const options: RequestInit = {
      method,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${this.API_ACCESS_TOKEN}`,
      },
      body: body ? JSON.stringify(body) : null,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        this.throwError(response.status);
      }

      return data;
    } catch (e) {
      throw e;
    }
  },
};

export default Api;
