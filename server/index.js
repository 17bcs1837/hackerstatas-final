const express = require('express');
const cors = require('cors');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Multer
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function(req, file, cb) {
//         cb(null, req.body.username+'.jpg');
//     }
// })

// const upload = multer({
//     storage: storage
// })

// AWS 
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const spacesEndpoint = new aws.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new aws.S3({
    endpoint: spacesEndpoint
});

// Multer S3
const uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'hackerstats',
        metadata: (req, file, cb) => {
            cb(null, {fieldName: file.fieldname});
        },
        key: (req, file, cb) => {
            cb(null, req.body.username+'.jpg');
        }
    })
})

//Server
const app = express();

// MiddleWares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('uploads'));

// Handlers
app.post("/user/register", (req, res) => {
    const mongo = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    mongo.connect().then((database) => {
        const db = database.db();
        
        db.collection('users').findOne({username: req.body.username})
        .then(response => {
            if(response === null) {
                bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    db.collection('users').insertOne({
                        username: req.body.username,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        password: hash,
                        userinfo: req.body.userinfo
                    })
                    .then(() => {
                        mongo.close();
                        res.json({
                            success: true
                        })
                    })
                })
            } else {
                mongo.close();
                res.json({
                    success: false
                })
            }
        })
    })
    .catch(err => {
        console.log("Unable to connect");
    })
})

app.post('/user/login', (req, res) => {
    const mongo = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    mongo.connect().then(database => {
        const db = database.db();

        db.collection('users').findOne({username: req.body.username})
        .then(response => {
            if(response !== null) {
                bcrypt.compare(req.body.password, response.password)
                .then(result => {
                    if(result === true) {
                        const token = jwt.sign({
                            username: response.username,
                            userinfo: response.userinfo
                        }, process.env.JWT_KEY);

                        res.json({msg: 'Login Success', JWT_TOKEN: token, userinfo: response.userinfo});
                    } else {
                        res.json({msg: 'Incorrect Credentials'});
                    }
                })
            } else {
                res.json({msg: 'User not found'});
            }
        })
    })
    .catch(err => {
        console.log("Unable to Connect to Database");
    })
})

app.post('/hackers', uploadS3.single('avatar'), (req, res) =>{
    const mongo = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    mongo.connect().then(database => {
        const db = database.db();

        db.collection('hackers').findOne({username: req.body.username})
        .then(response => {
            if(response === null) {
                db.collection('hackers').insertOne({
                    username: req.body.username,
                    name: req.body.name,
                    profile: req.body.profile,
                    location: req.body.location,
                    education: req.body.education,
                    solved: req.body.solved,
                    submitted: req.body.submitted,
                    accepted: req.body.accepted,
                    rank: req.body.rank,
                    datastructure: req.body.datastructure,
                    algorithms: req.body.algorithms,
                    cplus: req.body.cplus,
                    java: req.body.java,
                    python: req.body.python,
                    html: req.body.html,
                    javascript: req.body.javascript,
                    votes: req.body.votes,
                    device: req.body.device, 
                    avatar: 'https://hackerstats.sgp1.digitaloceanspaces.com/'+req.body.username+".jpg"
                })
                .then(() => {
                    res.json({success: true, msg: "Hacker Inserted Successfully"})
                })
            } else {
                mongo.close();
                res.json({
                    msg: 'Username already exists.'
                })
            }
        })
    })
    .catch(err => {
        console.log('Unable to connect to database');
    })
})

app.get('/hackers', (req, res) => {
    const mongo = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    mongo.connect().then(database => {
        const db = database.db();

        db.collection('hackers').find().toArray()
        .then(response => {
            res.send(response);
        })
    })
    .catch(err => {
        console.log(err)
    })
})

app.post('/delete', (req, res) => {
    const mongo = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    mongo.connect().then(database => {
        const db = database.db();

        db.collection('hackers').deleteOne({username: req.body.deleteUser})
        .then(response => {
            if(response.deletedCount === 1) {
                res.json({msg: "Hacker deleted successfully!"});
            } else {
                res.json({msg: "Hacker not found"});
            }
        })
    })
    .catch(err => {
        res.json({
            msg: "Unable to connect server. Try again Later."
        })
    })
})

app.listen(process.env.PORT || 5000);