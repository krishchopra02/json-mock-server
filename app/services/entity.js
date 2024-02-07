const store = require('../models/store')
const { v4: uuidv4 } = require('uuid')

const getAllEntities = async (entity) => {
  try {
    const data = await store.readData()
    return data?.[entity] || []
  } catch (error) {
    throw new Error(`Error getting ${entity}`)
  }
}

const getEntityById = async (entity, entityId) => {
  try {
    const data = await store.readData()
    return data?.[entity]?.find((item) => item.id == entityId)
  } catch (error) {
    throw new Error(`Error getting ${entity} by ID`)
  }
}

const addEntity = async (entity, newEntity) => {
  try {
    const data = await store.readData()

    newEntity.id = uuidv4()
    data[entity] = data[entity] || []
    data[entity].push(newEntity)

    await store.writeData(data)
    return newEntity
  } catch (error) {
    throw new Error(`Error adding ${entity}`)
  }
}

const updateEntity = async (entity, entityId, updatedEntity) => {
  try {
    const data = await store.readData()
    const index = data?.[entity]?.findIndex((item) => item.id == entityId)
    if (index !== -1) {
      // Check if id is mutated
      if (updatedEntity.id && updatedEntity.id != entityId) {
        throw new Error('Cannot mutate id during update')
      }

      data[entity][index] = { ...data[entity][index], ...updatedEntity }

      await store.writeData(data)
      return data[entity][index]
    } else {
      throw new Error(`${entity} not found`)
    }
  } catch (error) {
    throw new Error(`Error updating ${entity}`)
  }
}
const deleteEntity = async (entity, entityId) => {
  try {
    const data = await store.readData()
    const index = data?.[entity].findIndex((item) => item.id == entityId)
    if (index !== -1) {
      const deletedEntity = data[entity].splice(index, 1)[0]

      await store.writeData(data)
      return deletedEntity
    } else {
      throw new Error(`${entity} not found`)
    }
  } catch (error) {
    throw new Error(`Error deleting ${entity}`)
  }
}

module.exports = {
  getAllEntities,
  getEntityById,
  addEntity,
  updateEntity,
  deleteEntity,
}
