const routes = require("express").Router();
const bucketlistController = require("../controllers/bucketlistController");
const userController = require("../controllers/userController");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger-output.json");

routes.use("/api-docs", swaggerUi.serve);
routes.get("/api-docs", swaggerUi.setup(swaggerDocument));

routes.get("/", bucketlistController.getBucketlist);
routes.get("/:id", bucketlistController.getBucketlistItem);

routes.post("/", bucketlistController.createBucketlistItem);

routes.get("/:id", userController.getUser);

routes.post("/", userController.createUser);

module.exports = routes;
