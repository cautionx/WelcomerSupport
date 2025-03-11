const { Schema, model } = require("mongoose");

const ticketSchema = new Schema({
  userId: { type: String, required: true },
  ticketId: { type: Number, required: true }, 
  channelId: { type: String, required: true },
  solved: { type: Boolean, default: false }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = model("Ticket", ticketSchema);
