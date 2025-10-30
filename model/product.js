import mongoose,{Schema} from "mongoose";

const productSchema = new Schema({
  title: {type:String, required:true, unique:true},
      description: {type:String, required:true},
      price: {type: Number, min:[0,'too low price'], required:true},
      discountPercentage: {type: Number, min:[0,'too low discount'], max:[50, 'too high discount']},
      rating: {type: Number, min:[0,'too low rating'], max:[5, 'too high rating']},
      brand: {type:String, required:true},
      category: {type:String, required:true},
      thumbnail: {type:String, required:true},
      images: [String]
});

const Product = mongoose.model('Product', productSchema);

export default Product;