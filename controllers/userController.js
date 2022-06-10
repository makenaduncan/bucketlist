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

module.exports = { getUser };
