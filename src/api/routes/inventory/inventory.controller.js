import { v4 as uuidv4 } from "uuid";
import { InternalServerError, CustomError } from "../../utils/customError";
import responseHandler from "../../utils/responseHandler";
import isEmpty from "../../utils/isEmpty";
import { paginate, sortDataByName, converToCSV } from "../../utils/data";
import DbModule from "../../../api/config/db";

export async function createInventoryItem(req, res, next) {
  try {
    let { name, price, description, stock, ownerId, location, totalSold } =
      req.body;
    const itemExist = await DbModule.findByName(name);
    if (itemExist) {
      return next(new CustomError(409, "Items with this name already exists"));
    }
    if (!stock) stock = 1;
    if (!totalSold) totalSold = 0;
    if (!description) description = "No description yet";
    const inventoryItem = {
      id: uuidv4(), // genrate unique id
      ownerId,
      name,
      price,
      description,
      stock,
      location,
      totalSold,
      createdAt: new Date(),
      updateddAt: new Date(),
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

export async function getItems(req, res, next) {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const items = await DbModule.find();
    if (items.length === 0) {
      return next(new CustomError(404, "No item found"));
    }

    // sort the items by names
    const sortedItems = sortDataByName(items);

    // add pagination
    const result = paginate(sortedItems, page, limit);
    return responseHandler(res, 200, result, "Items fetched successfully");
  } catch (error) {
    next(new InternalServerError(error));
  }
}

export async function editItem(req, res, next) {
  try {
    const { itemId } = req.params;
    if (isEmpty(req.body)) {
      return next(new CustomError(422, "No changes/updates made yet."));
    }

    const itemExists = await DbModule.findById(itemId);
    if (!itemExists) {
      return next(
        new CustomError(404, "Item does not exist or has been deleted")
      );
    }

    req.body.updatedAt = new Date();
    const updatedItem = await DbModule.update(itemId, req.body);
    if (!updatedItem) {
      return next(
        new CustomError(
          404,
          "Item with the ID doesn't exist or has been deleted"
        )
      );
    }
    return responseHandler(res, 200, updatedItem, "Item edited successfully");
  } catch (error) {
    next(new InternalServerError(error));
  }
}

export async function deleteItem(req, res, next) {
  try {
    const { itemId } = req.params;
    const itemExists = await DbModule.findById(itemId);
    if (!itemExists) {
      return next(
        new CustomError(404, "Item does not exist or has already been deleted")
      );
    }

    // check if it is the owner of the item
    if (itemExists.ownerId !== req.body.ownerId) {
      return next(
        new CustomError(400, "You can only delete items that you own")
      );
    }

    const deletedItem = await DbModule.delete(itemId);
    if (!deletedItem) {
      return next(new CustomError(404, "Could not delete item. Try again"));
    }
    return responseHandler(res, 200, deletedItem, "Item deleted successfully");
  } catch (error) {
    next(new InternalServerError(error));
  }
}

export async function exportToCSV(req, res, next) {
  const { ownerId } = req.body;
  try {
    // export to CSV
    const id = ownerId ? ownerId : null;
    responseHandler(
      res,
      200,
      {},
      "Data exported to CSV. File location in 'csv_exports' directory"
    );
    return await converToCSV(id);
  } catch (error) {
    next(new InternalServerError(error));
  }
}
