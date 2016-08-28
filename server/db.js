'use strict'

import MongoClient from 'mongodb'

let db
module.exports = () => {
  if (db) return Promise.resolve(db)
  return MongoClient.connect('mongodb://localhost:27017/runplan')
}
