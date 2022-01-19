import { body } from "express-validator";

// validation for creating inventory items
// name and price are required
// stock (defaults to 1) and description optional
const createInventoryRules = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Item name is required")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Item name must have a minimum of 4 characters"),
    body("price")
      .notEmpty()
      .withMessage("Item price is required")
      .matches(/^[0-9]+(\.[0-9]{1,2})?$/)
      .withMessage(`Price field can only be in format ${`120`}, ${`120.00`}`),
    body("description")
      .optional()
      .notEmpty()
      .withMessage("Description cannot be empty"),
    body("stock")
      .optional()
      .notEmpty()
      .withMessage("Stock cannot be empty")
      .matches(/^[0-9]*$/)
      .withMessage("Stock field must be a number"),
    body("ownerId").notEmpty().withMessage("ownerId is required").trim(),
    body("location").notEmpty().withMessage("Location is required"),
    body("totalSold")
      .optional()
      .notEmpty()
      .withMessage("Total sold cannot be empty")
      .matches(/^[0-9]*$/)
      .withMessage("Total sold must be a number"),
  ];
};

const editInventoryItemRules = () => {
  return [
    body("name")
      .optional()
      .notEmpty()
      .withMessage("Item name cannot be empty")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Item name must have a minimum of 4 characters"),
    body("price")
      .optional()
      .notEmpty()
      .withMessage("Item price cannot be empty")
      .matches(/^[0-9]+(\.[0-9]{1,2})?$/)
      .withMessage(`Price field can only be in format ${`120`}, ${`120.00`}`),
    body("description")
      .optional()
      .notEmpty()
      .withMessage("Description cannot be empty"),
    body("stock")
      .optional()
      .notEmpty()
      .withMessage("Stock cannot be empty")
      .matches(/^[0-9]*$/)
      .withMessage("Stock field must be a number"),
    body("totalSold")
      .optional()
      .notEmpty()
      .withMessage("Total sold cannot be empty")
      .matches(/^[0-9]*$/)
      .withMessage("Total sold must be a number"),
    body("location").optional().notEmpty().withMessage("Location is required"),
  ];
};

const deleteItemRules = () => {
  return [body("ownerId").notEmpty().withMessage("ownerId is required").trim()];
};

const exportInventoryToCSVRules = () => {
  return [
    // ownerid is optional, if passed it returns all inventories for that owner else returns all inventories
    body("ownerId")
      .optional()
      .notEmpty()
      .withMessage("ownerId cannot be empty")
      .trim(),
  ];
};

export default {
  createInventoryRules,
  editInventoryItemRules,
  exportInventoryToCSVRules,
  deleteItemRules,
};
