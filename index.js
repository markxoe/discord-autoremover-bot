require("dotenv").config();
const Discord = require("discord.js");
const mongoose = require("mongoose");

const client = new Discord.Client();

const channelsModel = require("./channels-model");

client.on("message", async (message) => {
  let overrideDont = false;
  if (message.content == "auto.start") {
    await channelsModel.updateOne(
      { _id: message.channel.id },
      {},
      { upsert: true }
    );
    message.reply("Okay, zum Deaktivieren: `auto.stop`");
    overrideDont = true;
  }
  if (message.content == "auto.stop") {
    await channelsModel.deleteOne({ _id: message.channel.id });
    message.reply("Okay, dann hör ich hald auf");
    overrideDont = true;
  }

  if (
    await channelsModel.exists({
      _id: message.channel.id,
    })
  ) {
    if (!overrideDont && message.author.id != client.user.id) message.delete();
  }
});

client.once("ready", () => {
  client.user.setActivity({ name: "auto.start", type: "LISTENING" });
});

mongoose.connect(process.env.mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.login(process.env.discordtoken);
