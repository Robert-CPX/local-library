import Genre from "../models/genre.mjs";
import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";

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
  res.render("genreForm", { title: "Create Genre" });
};

// Handle Genre create on POST.
export const genreCreatePost = [
  // validate and sanitize the name fields
  body("name", "Genre name required").trim().isLength({ min: 3 }).escape(),
  // process request after validation and sanitization
  expressAsyncHandler(async (req, res) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);
    // create a genre object with escaped and trimmed data
    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages
      res.render("genreForm", {
        title: "Create Genre",
        genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid
      // Check if Genre with same name already exists
      const genreExists = await Genre.findOne({ name: req.body.name }).exec();
      if (genreExists) {
        // genre exists, redirect to its detail page
        res.redirect(genreExists.url);
      } else {
        await genre.save();
        // new genre saved, redirect to its detail page
        res.redirect(genre.url);
      }
    }
  }),
];

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
