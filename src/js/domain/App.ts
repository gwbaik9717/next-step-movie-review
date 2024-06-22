import MovieListModel from "./MovieListModel";

class App {
  currentPage = 1;
  searchQuery = "";

  async init(movieList: MovieListModel) {
    await this.fetchMovieList(movieList);
  }

  async fetchMovieList(movieList: MovieListModel) {
    if (this.searchQuery) {
      try {
        await movieList.searchMovies(this.searchQuery, this.currentPage);
      } catch (e) {
        if (e instanceof Error) {
          alert(e.message);
        }
      }

      return;
    }

    try {
      await movieList.fetchMovies(this.currentPage);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  }

  async fetchNextPage(movieList: MovieListModel) {
    try {
      this.currentPage++;
      await this.fetchMovieList(movieList);
    } catch (e) {
      this.currentPage--;
      throw e;
    }
  }

  async searchMovies(movieList: MovieListModel) {
    try {
      this.currentPage = 1;
      movieList.clearMovies();
      await this.fetchMovieList(movieList);
    } catch (e) {
      throw e;
    }
  }
}

export default App;
