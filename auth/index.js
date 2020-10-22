const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
//const passport = require('passport');
const authRoute = require('./routes/auth');
//const productRouteAdmin = require('./routes/admin/productAdmin');
const productRouteUser = require('./routes/product');
const orderRoute = require('./routes/order');
const bodyParser = require('body-parser');
const postRoute = require('./routes/posts')
const cors = require('cors')




dotenv.config();

// Connect to DB

mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true } ,
    { useNewUrlParser: true },
    () => {
        console.log('connected to database')
});


//Middleware

app.use(express.json());
app.use(bodyParser.json());

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//Rout middlewares Admin
//app.use('/admin/api/product',productRouteAdmin);

// Route middLewares
 
app.use('/api/user',authRoute);
app.use('/api/product',productRouteUser);
app.use('/api/order',orderRoute);
app.use('/api/posts',postRoute)
/*app.use(session({
  name:"sessionId",
  session:"mySecret",
  saveUninitialized:false,
  resave:false,
  store: new mongoStore({
    mongooseConnection:mongoose.connection,
    ttl: 60*60*24*1 // expire in one day 60s * 60m *24h * 1d
  }),
  cookie:{
    secure:false,
    httpOnly:false,
    expires: new Date(Date.now() + 60 * 60 * 1000)// 1 hour
  }

}))*/

app.listen(3001,() => console.log('server is runing'));

