import { Router } from "express";
import Validation from "../../middlewares/validations/validation";
import inventoryValidations from "../../middlewares/validations/inventory.validation";
import {
  createInventoryItem,
  getItems,
  editItem,
  deleteItem,
} from "./inventory.controller.js";

const inventoryRouter = Router();

/**
 * @desc Get all items
 */
inventoryRouter.get("/items", getItems);

/**
 * @description To crate inventory item
 * @param {string}name
 * @param {string}description
 * @param {string}price
 * @param {string}stock
 */
inventoryRouter.post(
  "/",
  inventoryValidations.createInventoryRules(),
  Validation.validate,
  createInventoryItem
);

/**
 * @description To edit item
 */
inventoryRouter.patch(
  "/edit/:itemId",
  inventoryValidations.editInventoryItemRules(),
  Validation.validate,
  editItem
);

inventoryRouter.delete("/delete/:itemId", deleteItem);

export default inventoryRouter;
