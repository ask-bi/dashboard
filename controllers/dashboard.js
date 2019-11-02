const Apps = require('../models/Apps');
const Teams = require('../models/Team');

exports.getDashboard = async (req, res) => {
  const apps = await Apps.find({ creator: req.user._id });
  const teams = await Teams.find({ creator: req.user._id });
  res.render('dashboard', {
    title: 'dashboard',
    apps,
    teams
  });
};

exports.createApp = async (req, res) => {
  console.log(req.body);
  const {
    name, team, type, adapter, host, username, password, connectionString,
  } = req.body;
  const creator = req.user._id;
  const app = new Apps();
  app.name = name;
  app.creator = creator;
  app.team = team;
  app.type = type;
  app.adapter = adapter;
  app.host = host;
  app.connectionString = connectionString;
  app.username = username;
  app.password = password;
  try {
    await app.save();
    console.log(app);
  } catch (e) {
    console.log(e);
    req.flash('errors', e);
  }
  res.redirect('/dashboard');
};
