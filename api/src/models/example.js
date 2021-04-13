const mongoose = require('mongoose')

const exampleSchema = new mongoose.Schema({
  name: String,
  xl: Number,
  xr: Number,
  latex: String,
  x: Number,
  arrayA: {},
  arrayB: {},
  arrayX: {},
  arrayY: {},
  xfind: Number,
  arrayInput: {},
})

module.exports = mongoose.model('Example', exampleSchema)