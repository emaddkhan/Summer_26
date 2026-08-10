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
        image:req.body.image,   
    })
    res.redirect('/')
})
app.get('/delete/:id',async(req,res)=>{
    const deletedUser=await User.findByIdAndDelete(req.params.id)
    res.redirect('/')
})
app.get("/edit/:id",async(req,res)=>{
    const user=await User.findById(req.params.id)
    res.render('edit',{user});
})
app.post("/update/:id", async(req,res)=>{
    const updatedUser=await User.findByIdAndUpdate(req.params.id,{
        name:req.body.newName,
        username:req.body.newUsername,
        email:req.body.newEmail,
        image:req.body.newImage
    })
    res.redirect('/')
})

app.listen(port)
