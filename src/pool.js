'use strict'
const pg = require('pg')

const config = {
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  max: process.env.POSTGRES_MAX_CONNECTIONS || 100,
  idleTimeoutMillis: process.env.POSTGRES_IDLE_TIMEOUT || 10000
}

const pool = new pg.Pool(config)

function query (cmd, values) {
  return pool.query(cmd, values)
}

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
})

module.exports = {
  query
}
