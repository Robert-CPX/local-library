import Author from "../models/author.mjs";
import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";

// Display list of all authors.
export const authorList = expressAsyncHandler(async (req, res) => {
  const allAuthors = await Author.find().sort({ family_name: 1 }).exec();
  res.render("authorList", { title: "Author List", authors: allAuthors });
});

// Display detail page for a specific author.
export const authorDetail = expressAsyncHandler(async (req, res) => {
  const [author, allBooksByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary").exec(),
  ]);
  if (author === null) {
    const err = new Error("Author not found");
    err.status = 404;
    return next(err);
  }
  res.render("authorDetail", {
    title: "Author Detail",
    author,
    allBooksByAuthor,
  });
});

// Display author create form on GET.
export const authorCreateGet = (req, res) => {
  res.render("authorForm", { title: "Create Author" });
};

// Handle author create on POST.
export const authorCreatePost = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),

  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),

  body("date_of_birth", "Invalid date of birth")
    .optional({ checkFalsy: false })
    .isISO8601()
    .toDate(),

  body("date_of_death", "Invalid date of death")
    .optional({ checkFalsy: false })
    .isISO8601()
    .toDate(),

  expressAsyncHandler(async (req, res) => {
    // extract the validation errors from a request.
    const errors = validationResult(req);

    // create author object with escaped and trimmed data
    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.render("authorForm", {
        title: "Create Author",
        author,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // save author
      await author.save();
      // redirect to new author record
      res.redirect(author.url);
    }
  }),
];

// Display author delete form on GET.
export const authorDeleteGet = expressAsyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
});

// Display author delete on Post.
export const authorDeletePost = expressAsyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
});

// Display author update form on GET.
export const authorUpdateGet = expressAsyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Author update GET");
});

// Handle author update on POST.
export const authorUpdatePost = expressAsyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: Author update POST");
});
