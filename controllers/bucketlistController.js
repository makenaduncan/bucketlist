// const { UserInputError } = require("apollo-server-express");
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getBucketlist = async (req, res) => {
  const result = await mongodb.getDb().db().collection("items").find();
  result.toArray().then((lists) => {
    // if (err) {
    //   res.status(400).json({ message: err });
    //   return;
    // }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getBucketlistItem = async (req, res) => {
  console.log("HERE" + req.params.id);
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must input a valid id");
  }
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

const updateBucketlistItem = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must input a valid id");
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
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
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the contact."
      );
  }
};

const deleteBucketlistItem = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must input a valid id");
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("items")
    .remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the contact."
      );
  }
};

module.exports = {
  getBucketlist,
  getBucketlistItem,
  createBucketlistItem,
  updateBucketlistItem,
  deleteBucketlistItem,
};
