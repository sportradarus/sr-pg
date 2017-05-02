[![Build Status](https://travis-ci.org/sportradarus/sr-pg.svg?branch=master)](https://travis-ci.org/sportradarus/sr-pg) [![node](https://img.shields.io/badge/node-v6.10.0-blue.svg)]() [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
# SR-PG

A tiny convenience wrapper for [node-postgres](https://github.com/brianc/node-postgres). This exists to reduce cut and past code for PG pools and PG clients that exist throughout our projects.

### Environments
The service needs environment variables set in order to work. Locally these can be put in a .env file in the project root. 
When running in production, these will be set in the environment(s). 

```
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_HOST= // only required in non-local setups
POSTGRES_MAX_CONNECTIONS //connection pools only, if not set will default to 100
POSTGRES_IDLE_TIMEOUT //connection pools only, if not set will default to 10000 milliseconds
```

### Install

you can install this module using `npm i`. However since the package is not in the NPM registry you have to use a git URL in your package.json. You can limit by version by referencing a release tag.

For Example

```
 "sr-pg": "sportradarus/sr-pg#v0.0.1"
```

Two object are exposed in the module: `Pool` and `Client`.
Each object is a wrapper for the corresponding object in [node-postgres](https://github.com/brianc/node-postgres). 

#### Pool
pool.query(statement, values)
executes SQL statements using the connection pool

* `statement` raw SQL string
* `values` Array of statement parameters

```js

const pool = require('sr-pg').Pool


function getSomething(id) {
  return pool.query('select something from somewhere where id = $1', [id])
  .catch((err)=> {
    this.handleError(err)
  })
}


```  

#### Client
client.query(statement, values)
executes SQL statements using the client directly.  This will create a new, single, connection to the database.

* `statement` raw SQL string
* `values` Array of statement parameters

```js

const client = require('sr-pg').Pool


function getSomething(id) {
  //creating a new new connection to the d
  return client.query('select something from somewhere where id = $1', [id])
  .catch((err)=> {
    this.handleError(err)
  })
}


``` 

### Tests

Tests require a valid connection string that has access to the `pg_stat_activity` table. Assuming that is in place, tests can be run normally using `npm test`

