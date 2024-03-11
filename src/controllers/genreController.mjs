import Genre from "../models/genreModel.mjs";
import expressAsyncHandler from "express-async-handler";

// Display list of all Genre.
export const genreList = expressAsyncHandler(async (req, res) => {
  const genres = await Genre.find();
  res.render("genreList", { title: "Genre List", genres });
});

// Display detail page for a specific Genre.
export const genreDetail = expressAsyncHandler(async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  res.render("genreDetail", { title: "Genre Detail", genre });
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
