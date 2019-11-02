const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  users: Array,
  name: String,
  creator: String,
}, { timestamps: true });

const Teams = mongoose.model('Teams', teamSchema);

module.exports = Teams;
