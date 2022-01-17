import { Router } from "express";
import Validation from "../../middlewares/validations/validation";
import inventoryValidations from "../../middlewares/validations/inventory.validation";
import { createInventoryItem } from "./inventory.controller.js";

const inventoryRouter = Router();

inventoryRouter.get("/", (req, res) => {
  return res.send("Complete");
});

inventoryRouter.post(
  "/",
  inventoryValidations.createInventoryRules(),
  Validation.validate,
  createInventoryItem
);

export default inventoryRouter;
