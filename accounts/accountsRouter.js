const express = require('express');
const db = require('../data/dbConfig');
const { validateAccountId } = require('../middleware/validateAccountId');
const knex = require('knex');
const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    // translates to `SELECT * FROM posts`
    // res.json(await db.select("*").from("accounts"))
    res.status(200).json(await db("accounts").select())
  } catch (err) {
    res.status(500).json({
      err: err,
      errorMessage: 'The accounts information could not be retrieved.'
    })
    next(err)
  };
});

router.get('/:id', validateAccountId, async (req, res, next) => {
  try {
    // translates to `SELECT * FROM accounts WHERE id = ? LIMIT 1;`
		// since all select statements can return multiple values (in an array),
		// calling .first instead of .select will take out the first result in the array
		// (if we know there will only be one item)
    res.status(200).json(await db('accounts').first())
  } catch (err) {
    res.status(500).json({
      err: err,
      errorMessage: 'The account information could not be retrieved.'
    })
    next(err)
  };
})

router.post('/', async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    }
    const [id] = await db('accounts').insert(payload)
    res.status(201).json(await db('accounts').where('id', id).first())
  } catch (err) {
    res.status(500).json({
      err: err,
      errorMessage: 'Failed to create new account.'
    })
    next(err)
  };
})

router.put('/:id', validateAccountId, async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    }
    await db('accounts').where('id', req.params.id).update(payload)
    res.status(200).json(await db('accounts').where('id', req.params.id).first())
  } catch (err) {
    res.status(500).json({
      err: err,
      errorMessage: 'Failed to create new account.'
    })
    next(err)
  };
})

router.delete('/:id', validateAccountId, async (req, res, next) => {
  try {
    await db('accounts').where('id', req.params.id).del()
    res.status(200).json({
      message: 'One account has been deleted.'
    })
  } catch (err) {
    res.status(500).json({
      err: err,
      errorMessage: 'Failed to create new account.'
    })
    next(err)
  };
})

module.exports = router