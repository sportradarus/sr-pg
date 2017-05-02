'use strict'

const pg = require('pg')

const config = {
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST
}

function query (cmd, values) {
  const client = new pg.Client(config)
  return new Promise(function (resolve, reject) {
    client.connect(function (err) {
      if (err) {
        return reject(err)
      }

      client.query(cmd, values, function (err, result) {
        if (err) {
          return reject(err)
        }

        client.end(function (err) {
          if (err) {
            return reject(err)
          }
          return resolve(result)
        })
      })
    })
  })
}
module.exports = {
  query
}
