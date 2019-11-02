const Teams = require('../models/Team');

exports.showForm = async (req, res) => {
  const creator = req.user._id;
  const teams = await Teams.find({ creator });
  res.render('team', {
    teams
  });
};

exports.createTeam = (req, res) => {
  console.log(req.body);
  const team = new Teams();
  team.name = req.body.name;
  team.users = req.body.users;
  team.creator = req.user._id;
  team.save();
  res.redirect('/teams');
};
