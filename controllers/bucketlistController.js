const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getBucketlist = async (req, res) => {
  const result = await mongodb.getDb().db().collection("items").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getBucketlistItem = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db()
    .collection("items")
    .find({ _id: new ObjectId(req.params.id) });

  result.toArray().then((response) => {
    res.status(200).json(response);
  });
};

const createBucketlistItem = async (req, res) => {
  const item = {
    name: req.body.name,
    location: req.body.location,
    date: req.body.date,
    price: req.body.price,
    pack: req.body.pack,
    status: req.body.status,
    description: req.body.description,
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection("items")
    .insertOne(item);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error ||
          "Some error occurred while creating the bucketlist item."
      );
  }
};

module.exports = { getBucketlist, getBucketlistItem, createBucketlistItem };
