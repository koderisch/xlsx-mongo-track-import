'use strict';

const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, 'Name is required'],
  },
});

const Contract = mongoose.model('Contract', ContractSchema);

module.exports = Contract;
