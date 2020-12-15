const mongoose = require("mongoose");

const channelsModel = mongoose.model(
  "channels",
  new mongoose.Schema({ _id: String })
);

channelsModel.createCollection();
module.exports = channelsModel;
