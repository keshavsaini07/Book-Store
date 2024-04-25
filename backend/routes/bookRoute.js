import express from "express";
import bookModel from "../models/bookMOdel.js";
import { StatusCodes } from "http-status-codes";
const bookRoute = express.Router();

bookRoute.get("/book/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const book = await bookModel.findById(id);
    if (!book) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Book not found with ${id}` });
    }
    res.status(StatusCodes.OK).json({ data: book });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json("Internal Server Error");
  }
});

bookRoute.put("/book/:id", async (req, res) => {
  // console.log(req.body);
  const { id } = req.params;
  try {
    const { title, author, year } = req.body;
    if (!(title || author || year)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "please provide title author and year." });
    }
    // await book.(req.body);
    const book = await bookModel.findByIdAndUpdate(id, req.body);
    if (!book) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Book not found with ${id}` });
    }

    res
      .status(StatusCodes.OK)
      .json({ msg: "Book details updated!", data: book });
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json("Error updating book");
  }
});

bookRoute.delete("/book/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const book = await bookModel.findByIdAndDelete(id);
    if (!book) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Book not found with ${id}` });
    }
    res.status(StatusCodes.OK).json({ data: book });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json("Internal Server Error");
  }
});

bookRoute.get("/book", async (req, res) => {
  // console.log(req.body);
  try {
    const books = await bookModel.find();
    if (!books) {
      return res.status(StatusCodes.OK).json({ msg: "Books Not Available" });
    }
    res.status(StatusCodes.OK).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json("Internal Server Error");
  }
});

bookRoute.post("/book/:id", async (req, res) => {
  // console.log(req.body);
  try {
    const { title, author, year } = req.body;
    if (!(title || author || year)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "please provide title author and year." });
    }
    await bookModel.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: "New BOOK added!" });
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json("Error adding book");
  }
});

export default bookRoute;