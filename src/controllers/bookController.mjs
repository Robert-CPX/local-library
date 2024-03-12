import { Book, Bookinstance, Author, Genre } from "../models/index.mjs";
import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";

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
export const bookCreateGet = expressAsyncHandler(async (req, res) => {
  const [allAuthors, allGenres] = await Promise.all([
    Author.find().sort({ family_name: 1 }).exec(),
    Genre.find().sort({ name: 1 }).exec(),
  ]);
  res.render("bookForm", {
    title: "Create Book",
    authors: allAuthors,
    genres: allGenres,
  });
});

// Handle Book create on POST.
export const bookCreatePost = [
  // Convert the genre to an array.
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") req.body.genre = [];
      else req.body.genre = new Array(req.body.genre);
    }
    next();
  },

  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),
  // Process request after validation and sanitization.
  expressAsyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    });

    if (!errors.isEmpty()) {
      // There are errors, render form again with sanitized values/error messages.
      const [allAuthors, allGenres] = await Promise.all([
        Author.find().sort({ family_name: 1 }).exec(),
        Genre.find().sort({ name: 1 }).exec(),
      ]);
      // Mark our selected genres as checked.
      for (const genre of allGenres) {
        if (book.genre.indexOf(genre._id) > -1) {
          genre.checked = true;
        }
      }
      res.render("bookForm", {
        title: "Create Book",
        authors: allAuthors,
        genres: allGenres,
        book,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save book.
      await book.save();
      // Redirect to new book record.
      res.redirect(book.url);
    }
  }),
];

// Display Book delete form on GET.
export const bookDeleteGet = expressAsyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
});

// Handle Book delete on POST.
export const bookDeletePost = expressAsyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
});

// Display Book update form on GET.
export const bookUpdateGet = expressAsyncHandler(async (req, res) => {
  const [book, allAuthors, allGenres] = await Promise.all([
    Book.findById(req.params.id).populate("author").exec(),
    Author.find().sort({ family_name: 1 }).exec(),
    Genre.find().sort({ name: 1 }).exec(),
  ]);
  if (book === null) {
    const err = new Error("Book not found");
    err.status = 404;
    throw err;
  }
  // Mark our selected genres as checked.
  for (const genre of allGenres) {
    if (book.genre.indexOf(genre._id) > -1) {
      genre.checked = true;
    }
  }
  res.render("bookForm", {
    title: "Update Book",
    authors: allAuthors,
    genres: allGenres,
    book,
  });
});

// Handle Book update on POST.
export const bookUpdatePost = [
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") req.body.genre = [];
      else req.body.genre = new Array(req.body.genre);
    }
  },
  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),
  // Process request after validation and sanitization.
  expressAsyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped/trimmed data and old id.
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
      _id: req.params.id, // This is required, or a new ID will be assigned!
    });
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      const [allAuthors, allGenres] = await Promise.all([
        Author.find().sort({ family_name: 1 }).exec(),
        Genre.find().sort({ name: 1 }).exec(),
      ]);
      // Mark our selected genres as checked.
      for (const genre of allGenres) {
        if (book.genre.indexOf(genre._id) > -1) {
          genre.checked = true;
        }
      }
      res.render("bookForm", {
        title: "Update Book",
        authors: allAuthors,
        genres: allGenres,
        book,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      await Book.findByIdAndUpdate(req.params.id, book).exec();
      // Redirect to book detail page.
      res.redirect(book.url);
    }
  }),
];
