const dbConnect = require('../DB-connection/db-connect.js'),
    queries = require('./queries.js')

module.exports = function recent(request, response) {
    dbConnect.connection()
        .query(queries.recent, (err, results, fields) => {
            if (err) throw err

            response.render("../public/pages/recent", { results })
            response.end()
        })

    dbConnect.connection().end()
}
