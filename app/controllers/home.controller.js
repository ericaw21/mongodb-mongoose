'use strict';
const mongoose = require('mongoose');
const KittenModel = require.main.require('./models/kitten.model');

module.exports = {
  index,
  save
};

//Called on '/' GET, pulls list of all kittens in database
function index(req, res, next) {
  KittenModel(mongoose.connection).find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
    for (var i = 0; i < kittens.length; i++) {
      console.log(kittens[i].name);
    }
    res.render('home/home.index.pug', {
      "kitties" : kittens
    });
  });

  // res.render('home/home.index.pug', { title: 'Express TEST'});
};

//Called on '/' POST, saves new kitty to database on form submit
function save(req, res, next) {
    let kittyName = req.body.kittyName || '';

    if (!kittyName) {
      throw new Error('Give this kitty a name right meow!');
    }

    // create a new kitty
    let KittyModel = KittenModel(mongoose.connection),
        kitty = new KittyModel({name: req.body.kittyName});

    kitty.save(function(err, newKitty) {
      let status = 200;
      res.locals.success = true;
      res.locals.message = 'KITTY SAVED';

      if (err) {
        status = 500;
        res.locals.success = false;
        res.locals.message = `Error saving kitty. ${err}`;
      }

      return res.redirect(status, '/');
    });
}
