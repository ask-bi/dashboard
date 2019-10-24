const Apps = require('../models/Apps');

exports.getDashboard = async (req, res) => {
  const apps = await Apps.find({ userID: req.user._id });
  res.render('dashboard', {
    title: 'dashboard',
    apps,
  });
};

exports.createApp = async (req, res) => {
  const {
    name, creator, team, type, adapter, host, username, password,
  } = req.body;
  const app = new Apps();
  app.name = name;
  app.creator = creator;
  app.team = team;
  app.type = type;
  app.adapter = adapter;
  app.host = host;
  app.username = username;
  app.password = password;
  try {
    await app.save();
  } catch (e) {
    req.flash('errors', e);
  }
  res.redirect('/dashboard');
}
