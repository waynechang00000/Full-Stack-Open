const router = require('express').Router()

require('express-async-errors');
const { Weather } = require('../models')

const weatherFinder = async (req, res, next) => {
  req.weather = await Note.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  try {
    const weathers = await Weather.findAll()
    res.json(weathers)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.post('/', async (req, res) => {
  try {
    const weather = await Weather.create(req.body)
    res.json(weather)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', weatherFinder, async (req, res) => {
  if (req.weather) {
    res.json(req.weather)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', weatherFinder, async (req, res) => {
  if (req.weather) {
    await req.weather.destroy()
  }
  res.status(204).end()
})

router.put('/:id', weatherFinder, async (req, res) => {
  if (req.weather) {
    req.weather.important = req.body.important
    await req.weather.save()
    res.json(req.weather)
  } else {
    res.status(404).end()
  }
})

module.exports = router
