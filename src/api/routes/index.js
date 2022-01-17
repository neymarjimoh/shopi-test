import inventoryRouter from "./inventory/inventory.route";

const apiPrefix = "/api/v1";

// other routes will be added here for easy organisation of endpoints
const routes = [
  {
    prefix: "inventory",
    name: inventoryRouter,
  },
];

export default (app) => {
  routes.forEach((element) => {
    app.use(`${apiPrefix}/${element.prefix}`, element.name);
  });
  return app;
};
