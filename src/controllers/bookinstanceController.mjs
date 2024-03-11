import BookInstance from "../models/bookinstance.mjs";
import expressAsyncHandler from "express-async-handler";

// Display list of all BookInstances.
export const bookinstanceList = expressAsyncHandler(async (req, res) => {
  const bookinstances = await BookInstance.find().populate("book");
  res.render("bookinstanceList", {
    title: "Book Instance List",
    bookinstances,
  });
});

// Display detail page for a specific BookInstance.
export const bookinstanceDetail = expressAsyncHandler(
  async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
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
