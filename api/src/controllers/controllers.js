// External Dependancies
const boom = require('@hapi/boom')

// Get Data Models
const Example = require('../models/example')

// Get all 
exports.getExample = async (req, reply) => {
  try {
    const example = await Example.find()
    return example
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single by name
exports.getSingleExample = async (req, reply) => {
  try {
    const name = req.params.name
    const example = await Example.findOne({name:name})
    return example
  } catch (err) {
    throw boom.boomify(err)
  }
}
/* 
// Add a new
exports.addExample = async (req, reply) => {
  try {
    const example = new Example(req.body)
    return example.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing
exports.updateExample = async (req, reply) => {
  try {
    const name = req.params.name
    const example = req.body
    const { ...updateData } = example
    const update = await Example.findOneAndUpdate({name:name}, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete
exports.deleteExample = async (req, reply) => {
  try {
    const name = req.params.name
    const example = await Example.findOneAndRemove({name:name})
    return example
  } catch (err) {
    throw boom.boomify(err)
  }
} */
