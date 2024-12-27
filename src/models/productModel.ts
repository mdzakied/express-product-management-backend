import mongoose, { Schema, Document } from "mongoose";

// Define the Product interface extending from Document
export interface IProduct extends Document {
  name: string;
  description?: string; // Optional description
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Product schema
const productSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false, // Not required
      default: null, // Default value
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Product model
const ProductModel = mongoose.model<IProduct>("Product", productSchema);

export default ProductModel;
