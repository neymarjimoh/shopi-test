import { Router } from "express";
import Validation from "../../middlewares/validations/validation";
import inventoryValidations from "../../middlewares/validations/inventory.validation";
import {
  createInventoryItem,
  getItems,
  editItem,
  deleteItem,
  exportToCSV,
} from "./inventory.controller.js";

const inventoryRouter = Router();

/**
 * @desc Get all items
 */
inventoryRouter.get("/items", getItems);

/**
 * @description To create inventory item
 * @param {string}name
 * @param {string}description
 * @param {string}price
 * @param {string}stock
 * @param {string}ownerId
 * @param {string}location
 * @param {string}totalSold
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

/**
 * @description To delete item in inventory
 */
inventoryRouter.delete("/delete/:itemId", deleteItem);

/**
 * @description To export product data to CSV format
 */
inventoryRouter.post("/csv", exportToCSV);

export default inventoryRouter;
