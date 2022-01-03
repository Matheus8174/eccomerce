import { Schema, model } from 'mongoose';

type categoryDocument = {
  name: string
};

const categorySchema = new Schema<categoryDocument>({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  }
}, { timestamps: true });

const Category = model('categorys', categorySchema);

export default Category;