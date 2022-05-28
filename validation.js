const { check } = require("express-validator");

exports.createBucketlistItemVal = [
  check("name", "Name must not be empty").not().isEmpty(),
  check("location", "Location must not be empty").not().isEmpty(),
  check("date", "date must not be empty").not().isEmpty(),
  check("price", "price must not be empty").not().isEmpty(),
  check("pack", "pack must not be empty").not().isEmpty(),
  check("status", "must not be empty").not().isEmpty(),
  check("description", "description must not be empty").not().isEmpty(),
];
