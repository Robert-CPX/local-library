import { Book, Bookinstance, Author, Genre } from "../models/index.mjs";
import expressAsyncHandler from "express-async-handler";

export const index = async (req, res) => {
  const [
    bookCount,
    bookInstanceCount,
    bookInstanceAvailableCount,
    authorCount,
    genreCount,
  ] = await Promise.all([
    Book.countDocuments({}).exec(),
    Bookinstance.countDocuments({}).exec(),
    Bookinstance.countDocuments({ status: "Available" }).exec(),
    Author.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Local Library Home",
    data: {
      bookCount,
      bookInstanceCount,
      bookInstanceAvailableCount,
      authorCount,
      genreCount,
    },
  });
};

// Display list of all Books.
export const bookList = expressAsyncHandler(async (req, res) => {
  const allBooks = await Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .exec();
  res.render("bookList", { title: "Book List", books: allBooks });
});

// Display detail page for a specific Book.
export const bookDetail = expressAsyncHandler(async (req, res, next) => {
  const [book, bookInstances] = await Promise.all([
    Book.findById(req.params.id).populate("author genre").exec(),
    Bookinstance.find({ book: req.params.id }).exec(),
  ]);
  if (book === null) {
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }
  res.render("bookDetail", {
    title: book.title,
    book,
    bookInstances,
  });
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
