import { v4 as uuidv4 } from "uuid";
import { InternalServerError, CustomError } from "../../utils/customError";
import responseHandler from "../../utils/responseHandler";
import isEmpty from "../../utils/isEmpty";
import DbModule from "../../../api/config/db";

export async function createInventoryItem(req, res, next) {
  try {
    let { name, price, description, stock } = req.body;
    const itemExist = await DbModule.findByName(name);
    if (itemExist) {
      return next(new CustomError(409, "Items with this name already exists"));
    }
    if (!stock) stock = 1;
    if (!description) description = "No description yet";
    const inventoryItem = {
      id: uuidv4(), // genrate uniqud id
      name,
      price,
      description,
      stock,
      createdAt: new Date(),
    };
    const saveItem = await DbModule.save(inventoryItem);
    if (!saveItem) {
      return next(
        new CustomError(400, "Inventory item creation wasn't successful")
      );
    }
    return responseHandler(res, 201, saveItem, "Item added successfully");
  } catch (error) {
    next(new InternalServerError(error));
  }
}
