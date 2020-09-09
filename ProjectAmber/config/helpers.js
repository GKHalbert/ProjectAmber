const Mysqli = require('mysqli');
const jwt = require('jsonwebtoken');

let conn = new Mysqli({
    host: 'us-cdbr-east-02.cleardb.com', 
    post: 3306,
    user: 'bc99d3c8670bc1',
    passwd: 'cb27659f', 
    db: 'heroku_bb589f3667c4161',
    multipleStatements: true
})

let db = conn.emit(false, '')

const secretKey = 'secretKey';

function verifyTokenGetId(req,res,next){
    if (!req.headers.authorization){
        next();
    }

    let token = req.headers.authorization.split(' ')[1];

    if (token === 'null'){
        next();
    }

    let payload = jwt.verify(token, secretKey);

    if(!payload){
        next();
    }

    db.table('users')
    .filter({username: payload.username})
    .get()
    .then(user => {
        if (!user){
            next();
        }
        else{
            req.userId = user.id;
            next();
        }
    }).catch(err => console.log(err));
}

module.exports = {
    database: db,
    secretKey: secretKey,
    tokenVerifier: verifyTokenGetId
}