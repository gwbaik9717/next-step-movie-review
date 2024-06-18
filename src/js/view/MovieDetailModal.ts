import { $ } from "../../utils/dom";
import UserMovieRatingForm from "./UserMovieRatingForm";
import MovieModel from "../domain/MovieModel";

const MovieDetailModal = {
  elements: {
    modal: $(".modal"),
    closeBtn: $(".modal-close"),
    modalInner: $(".modal-inner"),
    movieTitle: $(".movie-title"),
    modalBody: $(".modal-body"),
    movieHeader: $(".movie-header"),
    movieOverview: $(".movie-overview"),
    movieThumbnail: $(".movie-thumbnail"),
  },

  open(movie: MovieModel) {
    if (!MovieDetailModal.elements.modal) {
      return;
    }

    MovieDetailModal.elements.modal.classList.add("open");
    MovieDetailModal.render(movie);
  },

  close() {
    if (!MovieDetailModal.elements.modal) {
      return;
    }

    this.reset();
    MovieDetailModal.elements.modal.classList.remove("open");
  },

  reset() {
    if (
      !MovieDetailModal.elements.modal ||
      !MovieDetailModal.elements.movieTitle ||
      !MovieDetailModal.elements.movieThumbnail ||
      !MovieDetailModal.elements.movieHeader ||
      !MovieDetailModal.elements.movieOverview
    ) {
      return;
    }

    MovieDetailModal.elements.movieTitle.textContent = "";
    MovieDetailModal.elements.movieThumbnail.innerHTML = "";
    MovieDetailModal.elements.movieHeader.innerHTML = "";
    MovieDetailModal.elements.movieOverview.textContent = "";
    UserMovieRatingForm.reset();
  },

  addSkeleton() {
    if (
      !MovieDetailModal.elements.movieThumbnail ||
      !MovieDetailModal.elements.movieHeader ||
      !MovieDetailModal.elements.movieOverview
    ) {
      return;
    }

    UserMovieRatingForm.addSkeleton();
  },

  removeSkeleton() {
    if (
      !MovieDetailModal.elements.movieThumbnail ||
      !MovieDetailModal.elements.movieHeader ||
      !MovieDetailModal.elements.movieOverview
    ) {
      return;
    }

    UserMovieRatingForm.removeSkeleton();
  },

  renderMovieTitle(title: string) {
    if (!MovieDetailModal.elements.movieTitle) {
      return;
    }

    MovieDetailModal.elements.movieTitle.textContent = title;
  },

  renderMovieThumbnail(thumbnail: string, title: string) {
    if (!MovieDetailModal.elements.movieThumbnail) {
      return;
    }

    MovieDetailModal.elements.movieThumbnail.innerHTML = /* html */ `
      <img
        src=${thumbnail}
        alt=${title}
      />
    `;
  },

  renderMovieHeader(genres: string[], rating: number) {
    if (!MovieDetailModal.elements.movieHeader) {
      return;
    }

    MovieDetailModal.elements.movieHeader.innerHTML = /* html */ `
      <span class="modal-genres">${genres.join(", ")}</span>
      <img src="./images/star_filled.png" alt="별점" /> ${rating}
    `;
  },

  renderMovieOverview(overview: string) {
    if (!MovieDetailModal.elements.movieOverview) {
      return;
    }

    MovieDetailModal.elements.movieOverview.textContent = overview;
  },

  async render(movie: MovieModel) {
    MovieDetailModal.renderMovieTitle(movie.title);

    MovieDetailModal.addSkeleton();
    await Promise.all([movie.fetchMovieDetail(), movie.fetchMovieUserRating()]);
    MovieDetailModal.removeSkeleton();

    MovieDetailModal.renderMovieThumbnail(movie.thumbnail, movie.title);
    MovieDetailModal.renderMovieHeader(movie.genres, movie.rating);
    MovieDetailModal.renderMovieOverview(movie.overview);
    UserMovieRatingForm.render(movie);
  },
};

export default MovieDetailModal;
