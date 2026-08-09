const express = require('express');
const path = require('path');
const app = express();
const User = require('./usermodel');
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', async (req, res) => {
    const users = await User.find();
    // res.send(users);
    res.render('index', { users });
});
app.post("/create", async(req, res) => {
    console.log(req.body);
    const createdUser = await User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
    })
    res.redirect('/')
})
app.get('/delete:id',async(req,res)=>{
    const deletedUser=await User.find(req.params.id)
    res.redirect('/')
})
app.listen(port)
