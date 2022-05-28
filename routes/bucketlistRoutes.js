const routes = require("express").Router();
const bucketlistController = require("../controllers/bucketlistController");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger-output.json");
const { createBucketlistItemVal } = require("../validation.js");

routes.use("/api-docs", swaggerUi.serve);
routes.get("/api-docs", swaggerUi.setup(swaggerDocument));

routes.get("/", bucketlistController.getBucketlist);
routes.get("/:id", bucketlistController.getBucketlistItem);

routes.post(
  "/",
  createBucketlistItemVal,
  bucketlistController.createBucketlistItem
);
routes.put(
  "/:id",
  createBucketlistItemVal,
  bucketlistController.updateBucketlistItem
);
routes.delete("/:id", bucketlistController.deleteBucketlistItem);

module.exports = routes;
