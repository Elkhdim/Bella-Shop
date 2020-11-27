const router = require('express').Router();
const express = require('express');
const app = express();
const AppUser = require('../model/User');
const { registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const jwt = require('jsonwebtoken')

app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

router.post('/register', async (req,res) => {
    //Let validate befor a user
    console.log(req.body)
    const { error } = registerValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message)
    
   // search email if exist in database
    const emailexist = await AppUser.findOne({email: req.body.email});
    if(emailexist) return res.status(400).send('email already exists');
    
    //Hash password
   const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);


   const user = new AppUser( { 
       name : req.body.name,
       email : req.body.email,
       password : hashPassword
    });
    try {
        const saveUser = await user.save();
        res.send(saveUser);
       
    
    }
    catch(err) {
        res.status(400).send(err);
    }
  
});

//Login
var sess;
router.post('/login', async (req,res) => {

    

    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

      // search email if exist in database

    /*  const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password,salt);*/
      const user = await AppUser.findOne({ email: req.body.email,password : req.body.password});
      if(!user) return res.status(401).send('email or password is wrong');
     // const passwordexist = bcrypt.compare(hashPassword,user.password)
    //Get password
     // if(!passwordexist) return res.status(400).send('Invalid password');

     

      
   /* sess = req.session;
        
      sess.email = req.body.email;*
      
      if(sess.email) {
        
         console.log(sess.email)
        
      }*/

      // Create and assign token

      const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET,{expiresIn : "1h"});
      res.cookie('t', token, { expire: new Date() + 9999 })
      res.header('auth-token',token).json({token,user} );
     
      return res.status(200).send(token)

});
router.get('/', async (req,res)=>{
    const getAllUsers = await AppUser.find();
    res.send(getAllUsers);
})
router.get('/logout', async (req, res) => {
        res.clearCookie('t')
        res.json({ message: 'Signout success' });
});




module.exports = router