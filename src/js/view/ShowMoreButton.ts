import { $ } from "../../utils/dom";
import MovieCardList from "./MovieCardList";
import App from "../domain/App";
import MovieListModel from "../domain/MovieListModel";

const ShowMoreButton = {
  elements: {
    button: $(".show-more"),
  },

  async handleClick(app: App, movieList: MovieListModel) {
    MovieCardList.addSkeleton();

    try {
      await app.fetchNextPage(movieList);
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }

    MovieCardList.removeSkeleton();

    const newMovies = movieList.getMoviesByPage(app.currentPage);
    MovieCardList.render(newMovies);
  },

  show() {
    if (!ShowMoreButton.elements.button) {
      return;
    }

    ShowMoreButton.elements.button.classList.remove("hidden");
  },

  hide() {
    if (!ShowMoreButton.elements.button) {
      return;
    }

    ShowMoreButton.elements.button.classList.add("hidden");
  },
};

export default ShowMoreButton;
