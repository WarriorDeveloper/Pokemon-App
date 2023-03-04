const router = require('express').Router()

// CONTROLLERS
const getTypes = require('../controllers/getTypes')

router.get('/', async (req, res)=>{
    try {
        const types = await getTypes()
        if (types.error) throw Error(types.error)
        res.status(200).json(types)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

module.exports = router