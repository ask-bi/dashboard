const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  userID: { type: String, index: true },
  appName: String,
  connectionString: String,
  username: String,
  password: String,
  host: String,
  team: String,
}, { timestamps: true });

const Teams = mongoose.model('Teams', teamSchema);

module.exports = Teams;
