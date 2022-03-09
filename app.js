const express = require("express");
const { fstat } = require("fs");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

mongoose.connect('mongodb://localhost/contactDance');
const port = 8000;

//define mongoose schema
const contactSchema = new mongoose.Schema({ 
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
 });

 var Contact = mongoose.model('Contact', contactSchema)

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    a})

    // res.status(200).render('contact.pug');
})
// app.post('/contact', (req, res)=>{
//     name = req.body.name;
//     phone = req.body.phone;
//     email = req.body.email;
//     address = req.body.address;
//     desc = req.body.desc;
//     let outputToWrite = ` The name is ${name}, phone no: ${phone}, email: ${email}, residing at ${address}. More: ${desc}`
//     fs.writeFileSync('output.txt', outputToWrite)
//     const params = {'message': 'Your form has been submitted successfully'}
//     res.status(200).render('contact.pug', params);
// })

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});