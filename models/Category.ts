import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
},{
    timestamps: true,
});

export const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export type CategoryType = {
  _id: mongoose.Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
