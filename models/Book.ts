import mongoose from "mongoose";
import "./Category"; // Učitaj Category model prije Book modela
import type { CategoryType } from "./Category";
import { FilterType } from "./Filter";
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  letter: { type: String, required: true },
  format: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: Number, required: true },
  binding: { type: String, required: true },
  pages: { type: Number, required: true },
  publisher: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: true },
  inPreparation: { type: Boolean, required: true, default: false },
  category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Category" },  
  filter: { type: mongoose.Schema.Types.ObjectId, ref: "Filter" },  
},{
    timestamps: true,
});

export const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export type BookType = {
  _id: mongoose.Types.ObjectId,
  title: string,
  author: string,
  letter: string,
  format: string,
  img: string,
  price: number,
  binding: string,
  pages: number,
  publisher: string,
  year: number,
  description: string,
  inPreparation: boolean,
  category: CategoryType,
  filter: mongoose.Types.ObjectId | FilterType,
  createdAt: Date;
  updatedAt: Date;
};
