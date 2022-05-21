const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getUser = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db()
    .collection("user")
    .find({ _id: new ObjectId(req.params.id) });

  result.toArray().then((response) => {
    res.status(200).json(response);
  });
};

const createUser = async (req, res) => {
  const item = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection("user")
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

module.exports = { getUser, createUser };
