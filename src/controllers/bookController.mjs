import Book from "../models/book.mjs";
import expressAsyncHandler from "express-async-handler";

export const index = (req, res) => {
  res.render("index", { title: "Local Library Home" });
};

// Display list of all Books.
export const bookList = expressAsyncHandler(async (req, res) => {
  const books = await Book.find();
  res.render("bookList", { title: "Book List", books });
});

// Display detail page for a specific Book.
export const bookDetail = expressAsyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
});

// Display Book create form on GET.
export const bookCreateGet = expressAsyncHandler((req, res) => {
  res.send("NOT IMPLEMENTED: Book create GET");
});

// Handle Book create on POST.
export const bookCreatePost = expressAsyncHandler((req, res) => {
  res.send("NOT IMPLEMENTED: Book create POST");
});

// Display Book delete form on GET.
export const bookDeleteGet = expressAsyncHandler((req, res) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
});

// Handle Book delete on POST.
export const bookDeletePost = expressAsyncHandler((req, res) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
});

// Display Book update form on GET.
export const bookUpdateGet = expressAsyncHandler((req, res) => {
  res.send("NOT IMPLEMENTED: Book update GET");
});

// Handle Book update on POST.
export const bookUpdatePost = expressAsyncHandler((req, res) => {
  res.send("NOT IMPLEMENTED: Book update POST");
});
