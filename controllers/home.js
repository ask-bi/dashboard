/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  console.log(req.user);
  if (req.user) {
    return res.redirect('dashboard');
  }
  res.render('home', {
    title: 'Home'
  });
};
