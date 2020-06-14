'use strict';

const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: [true, 'Title is required'],
  },
  Version: {
    type: String,
  },
  Artist: {
    type: String,
  },
  ISRC: {
    type: String,
    required: [true, 'ISRC is required'],
  },
  PLine: {
    type: String,
  },
  Aliases: {
    type: Array,
  },
  ContractID: {
    type: mongoose.ObjectId,
  },
});

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;
