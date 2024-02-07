const fs = require('fs').promises
const dbFilePath = process.env.dbFilePath || 'store.json'

const readData = async () => {
  try {
    const data = await fs.readFile(dbFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    throw new Error('Error reading data')
  }
}
const writeData = async (data) => {
  try {
    await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2), 'utf8')
  } catch (error) {
    throw new Error('Error writing data')
  }
}

module.exports = { readData, writeData }
