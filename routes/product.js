import e from "express";
import {
  createProducts,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
  changeProduct,
} from "../controller/product.js";

const productRouter = e.Router();

// CREATE POST /products
productRouter.post("/", createProducts);
// READ GET /products
productRouter.get("/", getProducts);
// READ GET /products/:id
productRouter.get("/:id", getProductById);

// UPDATE- PUT vs PATCH: in put all properties are overrided, even the ones i did not mention to update are removed. but in patch only the mentioned properties are updated and rest remain unchanged

// UPDATE PUT /products/:id
productRouter.put("/:id", changeProduct);
// UPDATE PATCH /products/:id
productRouter.patch("/:id", updateProduct);
// Delete DELETE /products/:id
productRouter.delete("/:id", deleteProduct);

export default productRouter;
