//DEPENDENCIES
require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const cors = require('cors')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// MIDDLEWARE
// Setup Cors middleware
const whitelist = ['http://localhost:3000', process.env.BASEURL]
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	credentials:true
}
app.use(cors(corsOptions))


// this line is creating the object "req.session"
app.use(session({
	secret: process.env.SECRET,
	resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
	saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
	store: new MongoDBStore({
		uri: process.env.MONGODBURI,
		collection: 'mySessions'
	})
}))

// SETUP mongoose
const db = mongoose.connection;
mongoose.connect(process.env.MONGODBURI,{
	useNewUrlParser:true,
	useUnifiedTopology: true,
	useFindAndModify: false
});


// set up listeners to monitor your DB connection
db.once('open', ()=> console.log('DB connected...'));
db.on('error', (error)=> console.log(error.message));
db.on('disconnected', ()=> console.log('Mongoose disconnected...'));

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.status(403).json({msg:"login required"})
    }
}
// this will tell the server to parse the JSON data, and create the req.body object.
app.use(express.json());


// controllers
app.use('/topics', require('./controllers/topicController'))
app.use('/posts', require('./controllers/postController'))


app.listen(PORT, ()=>{
	console.log(`Server is listening on port ${PORT}`);
})
