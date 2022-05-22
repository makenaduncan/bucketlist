const routes = require("express").Router();
const bucketlistController = require("../controllers/bucketlistController");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger-output.json");

routes.use("/api-docs", swaggerUi.serve);
routes.get("/api-docs", swaggerUi.setup(swaggerDocument));

routes.get("/", bucketlistController.getBucketlist);
routes.get("/:id", bucketlistController.getBucketlistItem);

routes.post("/", bucketlistController.createBucketlistItem);

module.exports = routes;
