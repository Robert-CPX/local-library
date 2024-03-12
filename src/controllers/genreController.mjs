import Genre from "../models/genre.mjs";
import expressAsyncHandler from "express-async-handler";

// Display list of all Genre.
export const genreList = expressAsyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Genre list");
});

// Display detail page for a specific Genre.
export const genreDetail = expressAsyncHandler(async (req, res) => {
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, "title summary").exec(),
  ]);
  if (genre === null) {
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }
  res.render("genreDetail", {
    title: "Genre Detail",
    genre,
    booksInGenre,
  });
});

// Display Genre create form on GET.
export const genreCreateGet = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre create GET");
};

// Handle Genre create on POST.
export const genreCreatePost = expressAsyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Genre create POST");
});

// Display Genre delete form on GET.
export const genreDeleteGet = expressAsyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
});

// Handle Genre delete on POST.
export const genreDeletePost = expressAsyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
});

// Display Genre update form on GET.
export const genreUpdateGet = expressAsyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
});

// Handle Genre update on POST.
export const genreUpdatePost = expressAsyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
});
