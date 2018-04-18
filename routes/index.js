const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  // "req.session" is our session object (managed by Passport)
  console.log(req.session);
  // "req.user" is how you access user info from Passport
  console.log(req.user);

  res.render('index');
});

module.exports = router;
