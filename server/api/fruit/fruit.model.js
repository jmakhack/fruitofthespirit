'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FruitSchema = new Schema({
  name: {type: String, required: true},
  verses: [{text: String, reference: String}]
});

module.exports = mongoose.model('Fruit', FruitSchema);