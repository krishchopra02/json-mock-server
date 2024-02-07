const controllers = require('../controllers/entity')
const router = require('express').Router()

router.get('/:entity', controllers.getAllEntities)
router.get('/:entity/:id', controllers.getEntityById)
router.post('/:entity', controllers.addEntity)
router.put('/:entity/:id', controllers.updateEntity)
router.delete('/:entity/:id', controllers.deleteEntity)
module.exports = router
