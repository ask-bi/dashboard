const Apps = require('../models/Apps');

exports.getDashboard = async (req, res) => {
  const apps = await Apps.find({ userID: req.user._id });
  res.render('dashboard', {
    title: 'dashboard',
    apps,
  });
};

exports.createApp = (req, res) => {
  const name = req.body.name;
  const creator = req.user._id;
  const team = req.body.team;
  const type = req.body.type;
  
  res.redirect('/dashboard');
}