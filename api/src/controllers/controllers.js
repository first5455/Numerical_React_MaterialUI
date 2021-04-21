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

