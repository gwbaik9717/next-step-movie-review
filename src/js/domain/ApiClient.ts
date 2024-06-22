import ApiError from "./ApiError";

const ApiClient = {
  API_KEY: window.Cypress
    ? Cypress.env("TMDB_API_KEY")
    : process.env.TMDB_API_KEY,
  API_ACCESS_TOKEN: window.Cypress
    ? Cypress.env("TMDB_API_ACCESS_TOKEN")
    : process.env.TMDB_API_ACCESS_TOKEN,
  BASE_URL: "https://api.themoviedb.org/3",

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
        throw new ApiError(response.status);
      }

      return data;
    } catch (e) {
      if (e instanceof ApiError) {
        throw e.code;
      }

      throw e;
    }
  },
};

export default ApiClient;
