import BookInstance from "../models/bookinstance.mjs";
import expressAsyncHandler from "express-async-handler";
import { Book } from "../models/index.mjs";
import { body, validationResult } from "express-validator";

// Display list of all BookInstances.
export const bookinstanceList = expressAsyncHandler(async (req, res) => {
  const allBookInstances = await BookInstance.find().populate("book").exec();
  res.render("bookinstanceList", {
    title: "Book Instance List",
    bookinstances: allBookInstances,
  });
});

// Display detail page for a specific BookInstance.
export const bookinstanceDetail = expressAsyncHandler(
  async (req, res, next) => {
    const bookInstance = await BookInstance.findById(req.params.id)
      .populate("book")
      .exec();
    if (bookInstance === null) {
      const err = new Error("Book copy not found");
      err.status = 404;
      return next(err);
    }
    res.render("bookinstanceDetail", {
      title: `Book: ${bookInstance.book.title}`,
      bookInstance,
    });
  }
);

// Display BookInstance create form on GET.
export const bookinstanceCreateGet = expressAsyncHandler((req, res) => {
  const allBooks = Book.find({}, "title").sort({ title: 1 }).exec();
  res.render("bookinstanceForm", {
    title: "Create BookInstance",
    books: allBooks,
  });
});

// Handle BookInstance create on POST.
export const bookinstanceCreatePost = [
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("dueBack", "Invalid date")
    .optional({ checkFalsy: false })
    .isISO8601()
    .toDate(),
  // Process request after validation and sanitization
  expressAsyncHandler(async (req, res) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create a BookInstance object with escaped and trimmed data.
    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      dueBack: req.body.dueBack,
    });
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      const allBooks = Book.find({}, "title").sort({ title: 1 }).exec();
      res.render("bookinstanceForm", {
        title: "Create BookInstance",
        books: allBooks,
        selectedBook: bookInstance.book._id,
        errors: errors.array(),
        bookInstance,
      });
      return;
    } else {
      // Data from form is valid.
      await bookInstance.save();
      // Successful - redirect to new record.
      res.redirect(bookInstance.url);
    }
  }),
];

// Display BookInstance delete form on GET.
export const bookinstanceDeleteGet = expressAsyncHandler((req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
});

// Handle BookInstance delete on POST.
export const bookinstanceDeletePost = expressAsyncHandler((req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
});

// Display BookInstance update form on GET.
export const bookinstanceUpdateGet = expressAsyncHandler((req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
});

// Handle BookInstance update on POST.
export const bookinstanceUpdatePost = expressAsyncHandler((req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
});
