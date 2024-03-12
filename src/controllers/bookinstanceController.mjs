import BookInstance from "../models/bookinstance.mjs";
import expressAsyncHandler from "express-async-handler";

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
  res.send("NOT IMPLEMENTED: BookInstance create GET");
});

// Handle BookInstance create on POST.
export const bookinstanceCreatePost = expressAsyncHandler((req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
});

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
