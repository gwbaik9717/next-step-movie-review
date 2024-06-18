import { $, removeElements } from "../../utils/dom";
import Api from "../domain/Api";
import MovieCard from "./MovieCard";
import ShowMoreButton from "./ShowMoreButton";
import MovieCardListSkeleton from "./MovieCardListSkeleton";
import MovieModel from "../domain/MovieModel";

const MovieCardList = {
  elements: {
    movieCardList: $(".item-list"),
  },

  render(movies: MovieModel[]) {
    const movieCards = movies.map((movie) =>
      MovieCard.generateMovieCard(movie)
    );

    if (!this.elements.movieCardList) {
      return;
    }

    this.elements.movieCardList.append(...movieCards);

    if (movies.length < Api.NUM_MOVIES_PER_PAGE) {
      ShowMoreButton.hide();
    } else {
      ShowMoreButton.show();
    }
  },

  clear() {
    if (!MovieCardList.elements.movieCardList) {
      return;
    }

    MovieCardList.elements.movieCardList.innerHTML = "";
  },

  addSkeleton() {
    if (!MovieCardList.elements.movieCardList) {
      return;
    }

    MovieCardList.elements.movieCardList.append(
      ...MovieCardListSkeleton.skeletonCards
    );
  },

  removeSkeleton() {
    if (!MovieCardList.elements.movieCardList) {
      return;
    }

    removeElements(
      MovieCardList.elements.movieCardList,
      MovieCardListSkeleton.selectors.SKELETON_CARD
    );
  },
};

export default MovieCardList;
