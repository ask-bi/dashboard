const mongoose = require('mongoose');

const appsSchema = new mongoose.Schema({
  creator: { type: String, index: true },
  name: String,
  connectionString: String,
  username: String,
  password: String,
  host: String,
  team: String,
}, { timestamps: true });

const Apps = mongoose.model('Apps', appsSchema);

module.exports = Apps;
