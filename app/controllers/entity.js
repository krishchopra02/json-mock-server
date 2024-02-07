const service = require('../services/entity')

const getAllEntities = async (req, res) => {
  const { entity } = req.params
  try {
    const entities = await service.getAllEntities(entity)
    res.json(entities)
  } catch (err) {
    res.status(500).send('Internal Server Error')
  }
}

const getEntityById = async (req, res) => {
  const { entity, id } = req.params
  try {
    const entityItem = await service.getEntityById(entity, id)
    if (entityItem) {
      res.json(entityItem)
    } else {
      res.status(404).send(`${entity} not found`)
    }
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

const addEntity = async (req, res) => {
  const { entity } = req.params
  try {
    const newEntity = await service.addEntity(entity, req.body)
    res.json(newEntity)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

const updateEntity = async (req, res) => {
  const { entity, id } = req.params
  try {
    const updatedEntity = await service.updateEntity(entity, id, req.body)

    res.json(updatedEntity)
  } catch (error) {
    res.status(500).send('Internal Server Errror')
  }
}
const deleteEntity = async (req, res) => {
  const { entity, id } = req.params
  try {
    const deletedEntity = await service.deleteEntity(entity, id)
    res.json(deletedEntity)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}

module.exports = {
  getAllEntities,
  getEntityById,
  addEntity,
  updateEntity,
  deleteEntity,
}
