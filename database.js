const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = 'db.db'

const db = new sqlite3.Database(DBSOURCE, (error) => {
    if (error) {
        console.error(error.message)
        throw error
    } else {
        console.log('Connected to the SQLite database.')
    }
})

module.exports = db