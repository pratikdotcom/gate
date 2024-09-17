// Count.js
const mongoose = require('mongoose');

const countSchema = new mongoose.Schema({
  mathematics: { type: Number, default: 0 },
  discreteMaths: { type: Number, default: 0 },
  aptitude: { type: Number, default: 0 },
  dsa: { type: Number, default: 0 },
  cProgramming: { type: Number, default: 0 },
  algorithms: { type: Number, default: 0 },
  digitalLogic: { type: Number, default: 0 },
  computerOrganization: { type: Number, default: 0 },
  theoryOfComputation: { type: Number, default: 0 },
  compilerDesign: { type: Number, default: 0 },
  dbms: { type: Number, default: 0 },
  os: { type: Number, default: 0 },
  cn: { type: Number, default: 0 }
});

const Count = mongoose.model('Count', countSchema);

module.exports = Count;
