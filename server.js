const express = require('express')
const path = require('path')
const db = require('./database')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))
}

const DEFAULT_ERROR_MESSAGE = 'Oops, something went wrong.'

// start application
app.listen(port, (error) => {
    if (error) throw error
    console.log('Server running on port ' + port)
})

const hasDbError = (response, error) => {
    if (error) {
        response.status(500).json({ error: DEFAULT_ERROR_MESSAGE })
        return true
    } else {
        return false
    }
}

// read all users
app.get('/api/users', function (request, response, next) {
    db.all('SELECT * FROM USER', [], (error, rows) => {
        if (!hasDbError(response, error)) {
            response.status(200).json(rows)
        } else {
            return
        }
    })
})

// read one user
app.get('/api/users/:id', (request, response, next) => {
    db.get('SELECT * FROM USER WHERE ID = ?', [request.params.id], function (error, row) {
        if (!hasDbError(response, error)) {
            response.status(200).json(row)
        } else {
            return
        }
    })
})

// create one user
app.post('/api/users', (request, response, next) => {
    const errors = []
    if (!request.body.name) {
        errors.push('No name specified.')
    }
    if (!request.body.username) {
        errors.push('No username specified.')
    }
    if (!request.body.email) {
        errors.push('No email specified.')
    }
    if (errors.length) {
        response.status(400).json({ error: errors.join(' ') })
        return
    }
    const data = {
        name: request.body.name,
        username: request.body.username,
        email: request.body.email,
        phone: request.body.phone || null,
        website: request.body.website || null,
    }
    const stmt = db
        .prepare('INSERT INTO USER (NAME, USERNAME, EMAIL, PHONE, WEBSITE) VALUES (?, ?, ?, ?, ?)')
        .run([data.name, data.username, data.email, data.phone, data.website], function (error, result) {
            if (!hasDbError(response, error)) {
                response.status(200).json({ id: this.lastID, ...data })
            } else {
                return
            }
        })
    stmt.finalize()
})

// update one user
app.put('/api/users/:id', (request, response, next) => {
    const errors = []
    if (!request.body.name) {
        errors.push('No name specified.')
    }
    if (!request.body.username) {
        errors.push('No username specified.')
    }
    if (!request.body.email) {
        errors.push('No email specified.')
    }
    if (errors.length) {
        response.status(400).json({ error: errors.join(' ') })
        return
    }
    const data = {
        name: request.body.name,
        username: request.body.username,
        email: request.body.email,
        phone: request.body.phone || null,
        website: request.body.website || null,
    }
    const stmt = db
        .prepare('UPDATE USER SET NAME = ?, USERNAME = ?, EMAIL = ?, PHONE = ?, WEBSITE = ? WHERE ID = ?')
        .run([data.name, data.username, data.email, data.phone, data.website, request.params.id], function (error, row) {
            if (!hasDbError(response, error) && Boolean(this.changes)) {
                response.status(200).json({ id: request.params.id, ...data })
            } else {
                response.status(500).json({ error: DEFAULT_ERROR_MESSAGE })
            }
        })
    stmt.finalize()
})

// delete one user
app.delete('/api/users/:id', (request, response, next) => {
    db.run('DELETE FROM USER WHERE ID = ?', request.params.id, (error) => {
        if (!hasDbError(response, error)) {
            response.status(204).send()
        } else {
            return
        }
    })
})

if (process.env.NODE_ENV === 'production') {
    app.get('*', function (request, response) {
        response.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}
