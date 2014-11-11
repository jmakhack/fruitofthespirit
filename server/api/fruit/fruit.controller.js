'use strict';

var _ = require('lodash');
var Fruit = require('./fruit.model');

// Get list of fruits
exports.index = function(req, res) {
  Fruit.find(function (err, fruits) {
    if(err) { return handleError(res, err); }
    return res.json(200, fruits);
  });
};

// Get a single fruit
exports.show = function(req, res) {
  Fruit.findById(req.params.id, function (err, fruit) {
    if(err) { return handleError(res, err); }
    if(!fruit) { return res.send(404); }
    return res.json(fruit);
  });
};

// Creates a new fruit in the DB.
exports.create = function(req, res) {
  Fruit.create(req.body, function(err, fruit) {
    if(err) { return handleError(res, err); }
    return res.json(201, fruit);
  });
};

// Updates an existing fruit in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Fruit.findById(req.params.id, function (err, fruit) {
    if (err) { return handleError(res, err); }
    if(!fruit) { return res.send(404); }
    var updated = _.merge(fruit, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, fruit);
    });
  });
};

// Deletes a fruit from the DB.
exports.destroy = function(req, res) {
  Fruit.findById(req.params.id, function (err, fruit) {
    if(err) { return handleError(res, err); }
    if(!fruit) { return res.send(404); }
    fruit.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}