var express = require('express');
var router = express.Router();
var config = require('../config');
var connect = require('../utils/sqlConnect');

// do some checking here => check the default user profile
// ternary statement => MDN ternary
var toRender = (config.kidsmode) ? 'main_kids' : 'home';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(toRender, {
    title: 'Flashback Home Page',
    mainpage : true,
    cms: false,
    parent: false
  });
});

router.get('/cms', (req, res) => {
  res.render('cmsForm', {
    title: 'CMS',
    cms: true,
    mainpage: false,
    parent: false,
    kids: false
  });
});

router.get('/parent', (req, res) => {
  connect.query('SELECT * FROM tbl_movies ORDER BY RAND() LIMIT 8', (err, result) => {
    if (err) {
      throw err; console.log(err);
    } else {
      console.log(result);
      res.render('profile', {
        movieData : result,
        title: 'Parents Page',
        cms: false,
        mainpage: false,
        parent: true,
        kids: false
      });
    }
  });
});

router.get('/kids', (req, res) => {
  connect.query('SELECT * FROM tbl_movies ORDER BY RAND() LIMIT 8', (err, result) => {
    if (err) {
      throw err; console.log(err);
    } else {
      console.log(result);
      res.render('profile', {
        movieData : result,
        title: 'Kids Page',
        cms: false,
        mainpage: false,
        parent: false,
        kids: true
      });
    }
  });
});

module.exports = router;
