import MovieCardList from "./MovieCardList";
import { $ } from "../../utils/dom";
import App from "../domain/App";
import MovieListModel from "../domain/MovieListModel";

const SearchBox = {
  elements: {
    searchBox: $(".search-box"),
    searchInput: $(".search-input"),
    searchButton: $(".search-button"),
  },

  async handleInputSearchQuery(e: Event, app: App) {
    const query = (e.target as HTMLInputElement).value;
    app.searchQuery = query;
  },

  async handleSubmitSearchQuery(app: App, movieList: MovieListModel) {
    MovieCardList.clear();
    MovieCardList.addSkeleton();

    try {
      await app.searchMovies(movieList);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
      return;
    }

    MovieCardList.removeSkeleton();
    MovieCardList.render(movieList.movies);
  },
};

export default SearchBox;
