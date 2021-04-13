// External Dependancies
const boom = require('@hapi/boom')

// Get Data Models
const Example = require('../models/example')

// Get all cars
exports.getExample = async (req, reply) => {
  try {
    const example = await Example.find()
    return example
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single car by ID
exports.getSingleExample = async (req, reply) => {
  try {
    const name = req.params.name
    const example = await Example.findOne({name:name})
    return example
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new car
/* exports.addExample = async (req, reply) => {
  try {
    const example = new Example(req.body)
    return example.save()
  } catch (err) {
    throw boom.boomify(err)
  }
} */

// Update an existing car
/* exports.updateExample = async (req, reply) => {
  try {
    const id = req.params.id
    const example = req.body
    const { ...updateData } = example
    const update = await Example.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
} */

// Delete a car
/* exports.deleteExample = async (req, reply) => {
  try {
    const id = req.params.id
    const example = await Example.findByIdAndRemove(id)
    return example
  } catch (err) {
    throw boom.boomify(err)
  }
} */
