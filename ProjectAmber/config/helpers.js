const Mysqli = require('mysqli');

let conn = new Mysqli({
    host: 'localhost', 
    post: 3306,
    user: 'Amber',
    passwd: '114514', 
    db: 'store_db',
    multipleStatements: true
})

let db = conn.emit(false, '')

module.exports = {
    database: db
}