const mongoose = require('mongoose')

const exampleSchema = new mongoose.Schema({
  name: String,
  xl: Number,
  xr: Number,
  latex: String,
  x: Number,
  arrayA: [Number],
  arrayB: [Number],
  arrayX: [Number],
  arrayY: [Number],
  xfind: Number,
  arrayInput: [Number],
})

module.exports = mongoose.model('Example', exampleSchema)