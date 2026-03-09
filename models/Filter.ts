import mongoose from "mongoose";
const { Schema } = mongoose;

const filterSchema = new Schema({
  name: { type: String, required: true },
},{
    timestamps: true,
});

export const Filter = mongoose.models.Filter || mongoose.model("Filter", filterSchema);

export type FilterType = {
  _id: mongoose.Types.ObjectId;
  name: string;
};
