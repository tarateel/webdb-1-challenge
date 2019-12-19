const accounts = require('../data/dbConfig');
const db = require('../data/dbConfig');

async function validateAccountId(req, res, next) {
  try {
    const account = await db('accounts').where('id', req.params.id).first()
    if (account) {
      next()
    } else {
      res.status(404).json({
        message: 'Account not found.'
      })
    }
    // (account) ? next() : res.status(404).json({ message: 'Account not found.' })
  } catch (err) {
    next(err)
  };
};

module.exports = {
  validateAccountId
};